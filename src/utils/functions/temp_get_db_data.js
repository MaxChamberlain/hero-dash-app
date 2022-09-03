const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export const getData = async (startDate, endDate, setLoading, setError) => {
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
    setLoading(true)
    startDate = new Date(startDate.setHours(0,0,0,0))
    endDate = new Date(endDate.setHours(23,59,59,999))
    try{

        const { data: pickData } = await axios.post(
            `${URL}/pickdata/getall`,
            {
                company_code,
                startDate,
                endDate,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const { data: packData } = await axios.post(
            `${URL}/packdata/getall`,
            {
                company_code,
                startDate,
                endDate
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const dates = getUniqueDates(pickData, packData, startDate, endDate)

        const newData = dates.map(date => {
            const filteredData = pickData.filter(item => new Date(item.updatedAt).toLocaleDateString('en-US') === date)
            const filteredPackData = packData.filter(item => new Date(item.updatedAt).toLocaleDateString('en-US') === date)
            return {
                date: date,
                name: `${new Date(date).toString().substring(0,3)}, ${new Date(date).toString().slice(4, 7)} ${new Date(date).getDate()}`,
                items_picked: filteredData.length || 0,
                orders_picked: [...new Set(filteredData.map(e => e.order_number))].length || 0,
                items_packed: filteredPackData.reduce((acc, curr) => acc + curr.total_items, 0) || 0,
                orders_packed: filteredPackData.length || 0,
            }
        })

        setLoading(false)
        return newData
    }catch(err){
        if(err.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        setError(err.response.data.message)
        console.log(err)
    }
}

const getUniqueDates = (pickData, packData, startDate, endDate) => {
    let dates = [...new Set(pickData.filter(e => new Date(new Date() - new Date(e.created_at)).getMonth() % 11 === 0).map(item => new Date(item.created_at).toLocaleDateString('en-US')))]
    let temp = [...new Set(pickData.filter(e => new Date(new Date() - new Date(e.created_at)).getMonth() % 11 === 0).map(item => new Date(item.created_at).toLocaleDateString('en-US')))]
        .forEach(date => {
            if(!dates.includes(date)){
                dates.push(date)
            }
        })

    let inputDates = []
    for(let i = new Date(startDate); i <= new Date(endDate); i.setDate(i.getDate() + 1)){
            inputDates.push(new Date(i).toLocaleDateString('en-US'))
    }
    inputDates.forEach(e => {
        if(new Date(e) > new Date()){
            inputDates = inputDates.slice(0, inputDates.indexOf(e) - 1)
        }
    })
    return dates
}