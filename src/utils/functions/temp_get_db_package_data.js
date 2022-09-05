const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export async function getData(company_code, dateRange, setLoading, setError){
    try{
        setLoading(true)
        const token = JSON.parse(localStorage.getItem('token')).token
        const company_code = JSON.parse(localStorage.getItem('token')).company_code
        const startDate = new Date(dateRange.startDate.setHours(0,0,0,0)).toISOString()
        const endDate = new Date(dateRange.endDate.setHours(23,59,59,999)).toISOString()
        const { data } = await axios.post(
            URL + '/packages/getall',
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
        const zoneData = (await axios.post(
            URL + '/zones/getall',
            {
                origin_zip: '802'
            },
            {
                headers:{
                    'Content-type': 'application/json'
                }
            }
        )).data


        const uniqueDates = getUniqueDates(data)
        let newData = parseData(data, uniqueDates, dateRange)
        newData = parseInputDates(newData, dateRange)
        newData.sort((a, b) => {
            if(a.date > b.date){
                return 1
            }
            if(a.date < b.date){
                return -1
            }
            return 0
        })
        setLoading(false)
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

function getUniqueDates(data){
    return [...new Set(data.filter(e => new Date(new Date() - new Date(e.created_date)).getMonth() % 11 === 0).map(item => new Date(item.created_date).toLocaleDateString('en-US')))]
}

function parseData(data, uniqueDates, dateRange){
    return uniqueDates.map(date => {
        const filteredData = data.filter(item => new Date(item.created_date).toLocaleDateString('en-US') === date && item.shipping_labels[0].cost > 0)

        return {
            date: date,
            name: `${new Date(date).toString().substring(0,3)}, ${new Date(date).toString().slice(4, 7)} ${new Date(date).getDate()}`,
            orders_sent: filteredData.reduce((a, b) => a + b.shipping_labels.length, 0),
            total_out_cost: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100) / 100,
            avg_out_cost: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100 / filteredData.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            total_in_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100) / 100,
            avg_in_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100 / filteredData.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            orders_with_free_shipping: filteredData.reduce((a, b) => {
              if(b.order.shipping_lines.price === 0 || b.order.shipping_lines.price === undefined || b.order.shipping_lines.price === null) {
                return a + 1
              }  
              return a
            }, 0),
        }
    })
}

function parseInputDates(newData, dateRange){
    let inputDates = []
    for(let i = new Date(dateRange.startDate); i <= new Date(dateRange.endDate); i.setDate(i.getDate() + 1)){
            inputDates.push(new Date(i).toLocaleDateString('en-US'))
    }
    inputDates.forEach(e => {
        if(new Date(e) > new Date()){
            inputDates = inputDates.slice(0, inputDates.indexOf(e) - 1)
        }
    })

    inputDates.forEach(e => {
        if(!newData.find(item => item.date === e)){
            newData.push({
                date: e,
                name: `${new Date(e).toString().substring(0,3)}, ${new Date(e).toString().slice(4, 7)} ${new Date(e).getDate()}`,
                orders_sent: 0,
                total_out_cost: 0,
                avg_out_cost: 0,
                total_in_price: 0,
                avg_in_price: 0,
                orders_with_free_shipping: 0
            })
        }
    })
    return newData
}

function getZoneData(data, zoneData){
    let zoneDataObj = data.filter(item => item.shipping_labels[0].cost > 0)
    zoneDataObj.forEach(e => {
        try{
            e.zone = zoneData.find(item => item.dest_zip === e.address.zip.slice(0,3)).zone_number
        }catch(err){
            console.log(e)
        }
    })
    let zones = [...new Set(zoneData.map(item => item.zone_number))]
    let retObj = []
    zones.forEach(e => {
        if(zoneDataObj.filter(item => item.zone === e).reduce((a, b) => a + b.shipping_labels.length, 0) > 0){
            retObj.push({
                zone: e,
                orders_sent: zoneDataObj.filter(item => item.zone === e).reduce((a, b) => a + b.shipping_labels.length, 0),
                total_out_cost: Math.round(zoneDataObj.filter(item => item.zone === e).reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100) / 100,
                avg_out_cost: Math.round(zoneDataObj.filter(item => item.zone === e).reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100 / zoneDataObj.filter(item => item.zone === e).reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
                total_in_price: Math.round(zoneDataObj.filter(item => item.zone === e).reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100) / 100,
                avg_in_price: Math.round(zoneDataObj.filter(item => item.zone === e).reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100 / zoneDataObj.filter(item => item.zone === e).reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            })
        }
    })
}

function getCarrierData(data){
    let carrierData = data.filter(item => item.shipping_labels[0].cost > 0)
    let carriers = [...new Set(carrierData.map(item => item.shipping_labels[0].carrier))]
    let retObj = []
    carriers.forEach(e => {
        let filteredDate = carrierData.filter(item => item.shipping_labels[0].carrier === e)
            retObj.push({
                carrier: e.split('_').map(l => l[0].toUpperCase() + l.slice(1)).join(' ').slice(0,3) === 'Dhl' ? 'DHL' : e.split('_').map(l => l[0].toUpperCase() + l.slice(1)).join(' '),
                orders_sent: filteredDate.reduce((a, b) => a + b.shipping_labels.length, 0),
                total_out_cost: Math.round(filteredDate.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100) / 100,
                avg_out_cost: Math.round(filteredDate.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100 / filteredDate.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
                total_in_price: Math.round(filteredDate.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100) / 100,
                avg_in_price: Math.round(filteredDate.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100 / filteredDate.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            })
    })
}

function getShipMethod(data){
    let shipData = data.filter(item => item.shipping_labels[0].cost > 0)
    let shipMethods = [...new Set(shipData.map(item => item.shipping_labels[0].shipping_method))]
    let retObj = []
    shipMethods.forEach(e => {
        let filteredDate = shipData.filter(item => item.shipping_labels[0].shipping_method === e)
            retObj.push({
                method: e === 'First' ? 'First Class' : e.replace('DHL SmartMail ', ''),
                orders_sent: filteredDate.reduce((a, b) => a + b.shipping_labels.length, 0),
                total_out_cost: Math.round(filteredDate.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100) / 100,
                avg_out_cost: Math.round(filteredDate.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100 / filteredDate.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
                total_in_price: Math.round(filteredDate.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100) / 100,
                avg_in_price: Math.round(filteredDate.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100 / filteredDate.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            })
    })
}