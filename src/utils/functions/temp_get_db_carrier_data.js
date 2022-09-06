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

        let newData = getCarrierData(data)
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

function getCarrierData(data){
    let carrierData = data.filter(item => item.shipping_labels[0] && item.shipping_labels[0].cost > 0)
    let carriers = [...new Set(carrierData.map(item => item.shipping_labels[0].carrier))]
    let retObj = []
    carriers.forEach(e => {
        let filteredData = carrierData.filter(item => item.shipping_labels[0].carrier === e)
            retObj.push({
                carrier: e.split('_').map(l => l[0].toUpperCase() + l.slice(1)).join(' ').slice(0,3) === 'Dhl' ? 'DHL' : e.split('_').map(l => l[0].toUpperCase() + l.slice(1)).join(' '),
                orders_sent: filteredData.reduce((a, b) => a + b.shipping_labels.length, 0),
                total_out_cost: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100) / 100,
                avg_out_cost: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100 / filteredData.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
                total_in_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100) / 100,
                avg_in_price: Math.round(filteredData.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100 / filteredData.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            })
    })
    return retObj
}