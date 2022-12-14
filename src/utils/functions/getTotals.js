const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export async function getData(dateRange, setLoading, setError){
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
    const startDate = new Date(dateRange.startDate.setHours(0,0,0,0)).toISOString()
    const endDate = new Date(dateRange.endDate.setHours(23,59,59,999)).toISOString()
    try{
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
        let newData = parseData(data, uniqueDates)
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
        return newData
    }catch(e){
        setError(e.response.data.message)
        console.error(e)
    }
}

function getUniqueDates(data){
    return [...new Set(data.filter(e => new Date(new Date() - new Date(e.created_date)).getMonth() % 11 === 0).map(item => new Date(item.created_date).toLocaleDateString('en-US')))]
}

function parseData(data, uniqueDates){
    return uniqueDates.map(date => {
        const filteredData = data.filter(item => new Date(item.created_date).toLocaleDateString('en-US') === date)


        return {
            date: date,
            name: `${new Date(date).toString().substring(0,3)}, ${new Date(date).toString().slice(4, 7)} ${new Date(date).getDate()}`,
            packages_sent: filteredData.reduce((a, b) => a + b.shipping_labels.length, 0),
            total_out_cost: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100) / 100,
            avg_out_cost: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100 / filteredData.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            total_in_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100) / 100,
            avg_in_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100 / filteredData.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            packages_with_free_shipping: filteredData.reduce((a, b) => {
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
                packages_sent: 0,
                total_out_cost: 0,
                avg_out_cost: 0,
                total_in_price: 0,
                avg_in_price: 0,
                packages_with_free_shipping: 0
            })
        }
    })
    return newData
}