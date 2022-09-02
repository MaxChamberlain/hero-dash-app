const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export const getData = async (company_code, startDate, endDate, setLoading, setError) => {
    setLoading(true)
    startDate = new Date(startDate.setHours(0,0,0,0))
    endDate = new Date(endDate.setHours(23,59,59,999))
    try{

        const { data: pickData } = await axios.post(
            `${URL}/picks/getall`,
            {
                company_code,
                startDate,
                endDate
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const { data: packData } = await axios.post(
            `${URL}/packs/getall`,
            {
                company_code,
                startDate,
                endDate
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const names = getUniqueNames(pickData, packData)

        const newData = names.map(name => {
            const filteredData = pickData.filter(item => `${item.user_first_name} ${item.user_last_name}` === name)
            const filteredPackData = packData.filter(item => `${item.user_first_name} ${item.user_last_name}` === name)
            return {
                name: name.split(' ')[0] + ' ' + name.split(' ')[1].charAt(0),
                items_picked: filteredData.length || 0,
                orders_picked: [...new Set(filteredData.map(e => e.order_number))].length || 0,
                items_packed: filteredPackData.reduce((acc, curr) => acc + curr.total_items, 0) || 0,
                orders_packed: filteredPackData.length || 0,
            }
        })

        setLoading(false)

        return newData
    }catch(err){
        setError(err.response.data.message)
        console.log(err)
    }
}

function getUniqueNames(pickData, packData){
    let names = [...new Set(pickData.map(item => `${item.user_first_name} ${item.user_last_name}`))]
    let temp = [...new Set(packData.map(item => `${item.user_first_name} ${item.user_last_name}`))]
        .forEach(name => {
            if(!names.includes(name)){
                names.push(name)
            }
        })
    return names
}