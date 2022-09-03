const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export async function getData(dateRange, setLoading, setError) {
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

        const newData = []
        newData.push(
            {
            name: 'Totals',
            'total_out_(Loss)': Math.round(data.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100) / 100,
            'total_in_(Gain)': Math.round(data.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100) / 100,
            'avg_in_(Gain)': Math.round(data.reduce((a, b) => a + parseFloat(b.order.shipping_lines.price || 0), 0) * 100 / data.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            'avg_out_(Loss)': Math.round(data.reduce((a, b) => a + parseFloat(b.shipping_labels.reduce((a, b) => a + b.cost, 0)), 0) * 100 / data.reduce((a, b) => a + b.shipping_labels.length, 0)) / 100,
            }
        )
        setLoading(false)
        return newData
    }catch(e){
        setError(e.response.data.message)
        console.error(e)
    }
}
