const axios = require('axios');
const URL = process.env.REACT_APP_API_URL
const allStates = require('../../pages/USAMap/data/allstates.json')

export async function getData(dateRange, setLoading, setError){
    const startDate = new Date(dateRange.startDate.setHours(0,0,0,0)).toISOString()
    const endDate = new Date(dateRange.endDate.setHours(23,59,59,999)).toISOString()
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
    try{
        setLoading(was => {
            return {
                ...was,
                state_data: true
            }
        })
        const { data } = await axios.post(
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
        const uniqueOriginZips = [...new Set(data.filter(item => item.warehouse).map(item => item.warehouse.address.zip.slice(0,3)))]
        const uniqueDestinationZips = [...new Set(data.map(item => item.address.zip.slice(0,3)))].filter(e => e)

        const uniqueStates = getUniqueStates(data)
        const zoneData = await getDHLZones(data, uniqueOriginZips, uniqueDestinationZips)
        let newData = parseData(zoneData, uniqueStates)
        setLoading(was => {
            return {
                ...was,
                state_data: false
            }
        })
        return newData
    }catch(e){
        if(e.response.status === 403 && window.location.href !== '/settings'){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        setError(e.response.data.message)
        console.error(e)
    }
}

function getUniqueStates(data){
    return [...new Set(data.map(e => e.address.state))]
}

function parseData(data, uniqueStates){
    return uniqueStates.map(state => {
        const filteredData = data.filter(item => item.address.state === state && item.order.total_price > 0)
        return {
            state,
            packages_sent: filteredData.reduce((a, b) => a + b.shipping_labels.length, 0),
            total_out_cost: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100) / 100,
            avg_out_cost: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100 / filteredData.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            total_in_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100) / 100,
            avg_in_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100 / filteredData.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            total_order_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.total_price), 0) * 100) / 100,
            avg_order_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.total_price), 0) * 100 / filteredData.length) / 100,
            id: allStates.find(e => e.id === state) ? allStates.find(e => e.id === state).val : state,
            zone_number: [...new Set(filteredData.map(e => e.zone_number))]
        }
    })
}

async function getDHLZones (packageData, origin_zip, destination_zip){
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token

    try{
        
        const { data: zoneData } = await axios.post(
            `${URL}/dhl_zones/findone`,
            {
                origin_zip,
                destination_zip,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        
        const dataWithZones = packageData.map(item => {
            const originZip = item.warehouse.address.zip.slice(0,3)
            const destinationZip = item.address.zip.slice(0,3)
            const zone = zoneData.find(e => e.origin_zip === originZip && e.destination_zip === destinationZip)
            const zone_number = zone ? zone.zone_number : 'N/A'
            return {
                ...item,
                zone_number
            }
        })
        return dataWithZones

    }catch(e){
        if(e.response.status === 403 && window.location.href !== '/settings'){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e)
    }
}