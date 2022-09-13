import { CSVDownload } from "react-csv";
const axios = require('axios');
const URL = process.env.REACT_APP_API_URL;
const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code

export const downloadData = async (dateRange, setDownloadable) => {
    console.log('starting download')
    const startDate = new Date(dateRange.startDate.setHours(0,0,0,0)).toISOString()
    const endDate = new Date(dateRange.endDate.setHours(23,59,59,999)).toISOString()
    try{
        const { data: packageData } = await axios.post(
            URL + '/packagedata/getall',
            {
                company_code,
                startDate,
                endDate,
            },
            {
                headers:{
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const uniqueOriginZips = [...new Set(packageData.filter(item => item.warehouse).map(item => item.warehouse.address.zip.slice(0,3)))]
        const uniqueDestinationZips = [...new Set(packageData.map(item => item.address.zip.slice(0,3)))].filter(e => e)

        const newData = await parseZoneData(packageData, uniqueOriginZips, uniqueDestinationZips)

        const csvData = newData.map(item => 
            item.data.map(e => 
                e.shipping_labels.map(x => {
                    return {
                        "order_id": e.order_id,
                        "order.order_number": e.order.order_number,
                        "order.total_price": e.order.total_price,
                        "order.shipping_price": e.order.shipping_lines.price,
                        "order.tax_price": e.order.total_tax,
                        "shipment.carrier": x.carrier,
                        'shipment.cost': x.cost,
                        "shipment.tracking_number": x.tracking_number,
                        'shipment.ship_method': x.shipping_method,
                        'shipment.method_name': x.shipping_name,
                        'shipment.weight': x.dimensions?.weight || 0,
                        'shipment.shipment_id': x.shipment_id,
                    }
                })
            )
        )

        const csvDataFlat = csvData.flat(2)

        const csvHeaders = [
            { label: "Order ID", key: "order_id" },
            { label: "Order Number", key: "order.order_number" },
            { label: "Order Total", key: "order.total_price" },
            { label: "Order Shipping", key: "order.shipping_price" },
            { label: "Order Tax", key: "order.tax_price" },
            { label: "Carrier", key: "shipment.carrier" },
            { label: "Cost", key: "shipment.cost" },
            { label: "Tracking Number", key: "shipment.tracking_number" },
            { label: "Ship Method", key: "shipment.ship_method" },
            { label: "Method Name", key: "shipment.method_name" },
            { label: "Weight", key: "shipment.weight" },
            { label: "Shipment ID", key: "shipment.shipment_id" },
        ]

        console.log('parsed, now downloading')
        
        setDownloadable(<CSVDownload data={csvDataFlat} headers={csvHeaders} filename={`ViDash_DHL_${startDate.slice(0,10)}_${endDate.slice(0,10)}.csv`} />)
        
    }catch(e){
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}

async function parseZoneData(data, origin_zips, destination_zips){
    try{
        
        const { data: zoneData } = await axios.post(
            `${URL}/dhl_zones/findone`,
            {
                origin_zip: origin_zips,
                destination_zip: destination_zips,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const uniqueZones = [...new Set(zoneData.map(item => item.zone_number))]
        const packagesPerZone = uniqueZones.map(zone => {
            const filteredData = data.filter(item => zoneData.filter(e => e.zone_number === zone).map(e => e.destination_zip).includes(item.address.zip.slice(0,3)))
            return {data: filteredData, zone: 'Zone ' + zone}
        })
        packagesPerZone.sort((a, b) => a.zone - b.zone)
        return packagesPerZone

    }catch(e){
        if(e.response.status === 403){ 
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}