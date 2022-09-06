const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export async function getData(dateRange, setLoading, setError){
    try{
        setLoading(true)
        const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
        const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
        const startDate = new Date(dateRange.startDate.setHours(0,0,0,0)).toISOString()
        const endDate = new Date(dateRange.endDate.setHours(23,59,59,999)).toISOString()

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

        const uniqueDates = getUniqueDates(data)
        let newData = getShipMethod(data, uniqueDates, dateRange)
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
                method: e === 'First' ? 'First Class' : e.replace('DHL SmartMail ', ''),
                orders_sent: 0,
                total_out_cost: 0,
                avg_out_cost: 0,
                total_in_price: 0,
                avg_in_price: 0,
            })
        }
    })
    return newData
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
    return retObj
}