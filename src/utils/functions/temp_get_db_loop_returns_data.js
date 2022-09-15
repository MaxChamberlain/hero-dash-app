const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export const getData = async(dateRange) => {
    // try{
        const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
        const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
        const startDate = new Date(dateRange.startDate.setHours(0,0,0,0)).toISOString()
        const endDate = new Date(dateRange.endDate.setHours(23,59,59,999)).toISOString()

        const { data } = await axios.post(
            `${URL}/loopreturns/${company_code}/get`,
            {
                startDate,
                endDate
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        
        const ordersCreated = data.filter(item => ([...new Set(data.map(item => new Date(item.updatedAt).toString().substring(0,10)))]).includes(new Date(item.created_at).toString().substring(0,10)))

        const newData = {
            data,
            totals: {
                total_returns: ordersCreated.length,
                total_exchange_orders: (new Set(ordersCreated.map(e => e.exchanges.map(x => x.exchange_order_name)).flat())).size,
                total_items: ordersCreated.reduce((a, b) => a + b.line_items.length, 0),
                total_refunded: (ordersCreated.reduce((a, b) => a + parseFloat(b.refund), 0)).toFixed(2),
                exchange_total: parseFloat((ordersCreated.reduce((a, b) => a + parseFloat(b.exchange_total), 0)).toFixed(2)),
                total_processed: data.filter(item => ([...new Set(data.map(item => new Date(item.created_at).toString().substring(0,10)))]).includes(new Date(item.closed).toString().substring(0,10))).length,
            },
            per_date: ([...new Set(data.map(item => new Date(item.created_at).toString().substring(0,10)))]).map(e => {
                const filteredData = data.filter(item => new Date(item.created_at).toString().substring(0,10) === e)
                return {
                    date: e,
                    total_returns: filteredData.length,
                    total_refunded: parseFloat((filteredData.reduce((a, b) => a + parseFloat(b.refund), 0)).toFixed(2)),
                    exchange_total: parseFloat((filteredData.reduce((a, b) => a + parseFloat(b.exchange_total), 0)).toFixed(2)),
                }
            })
        }

        console.log(newData.data)

        return newData

    // }catch(e){
    //     if(e.response.status === 403){
    //         localStorage.removeItem('@ViDash:_userInfo')
    //         window.location.reload()
    //     }
    //     console.log(e)
    // }
}
