const axios = require('axios');
const URL = process.env.REACT_APP_API_URL;
const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code

export const getDHLZone = async (dateRange, setLoading, setError) => {
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

        const newData = parseZoneData(packageData, uniqueOriginZips, uniqueDestinationZips)

        return newData
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
            return {
                zone,
                packages_sent: filteredData.length,
                total_out_cost: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100) / 100,
                total_in_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100) / 100,
                avg_out_cost: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) / filteredData.length * 100) / 100,
                avg_in_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) / filteredData.length * 100) / 100,
            }
        })
        packagesPerZone.sort((a, b) => a.zone - b.zone)
        return packagesPerZone.map(e => {return {...e, zone: `Zone ${e.zone}`}})

    }catch(e){
        if(e.response.status === 403){ 
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}