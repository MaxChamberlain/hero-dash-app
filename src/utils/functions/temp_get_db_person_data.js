const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export const getData = async (startDate, endDate, setLoading, setError) => {
    setLoading(true)
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
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

        const names = getUniqueNames(pickData, packData)

        const newData = names.map(name => {
            const filteredData = pickData.filter(item => `${item.user_first_name} ${item.user_last_name}` === name)
            const filteredPackData = packData.filter(item => `${item.user_first_name} ${item.user_last_name}` === name)

            const dates = [...new Set(filteredData.map(e => new Date(e.created_at).toLocaleDateString('en-US')))]
            const packDates = [...new Set(filteredPackData.map(e => new Date(e.created_at).toLocaleDateString('en-US')))]

            const mostRecentDate = new Date(Math.max(...dates.map(e => new Date(e))))
            const mostRecentPackDate = new Date(Math.max(...packDates.map(e => new Date(e))))

            const picksOnDate = filteredData.filter(item => new Date(item.created_at).toLocaleDateString('en-US') === mostRecentDate.toLocaleDateString('en-US'))
            const packsOnDate = filteredPackData.filter(item => new Date(item.created_at).toLocaleDateString('en-US') === mostRecentPackDate.toLocaleDateString('en-US'))

            picksOnDate.sort((a, b) => {
                return new Date(a.created_at) - new Date(b.created_at)
            })
            packsOnDate.sort((a, b) => {
                return new Date(a.created_at) - new Date(b.created_at)
            })

            const times = picksOnDate.map(e => {
                return new Date(e.created_at)
            })
            const packTimes = packsOnDate.map(e => {
                return new Date(e.created_at)
            })

            const s = Math.floor((times[times.length - 1] - times[0]) / 1000)
            const packSeconds = Math.floor((packTimes[packTimes.length - 1] - packTimes[0]) / 1000)

            const average = (s / filteredData.length).toFixed(0)
            const packAverage = (packSeconds / filteredPackData.length).toFixed(0)

            return {
                name: name.split(' ')[0] + ' ' + name.split(' ')[1].charAt(0),
                items_picked: filteredData.length || 0,
                orders_picked: [...new Set(filteredData.map(e => e.order_number))].length || 0,
                items_packed: filteredPackData.reduce((acc, curr) => acc + curr.total_items, 0) || 0,
                orders_packed: filteredPackData.length || 0,
                avg_pick_time: average || 0,
                avg_pack_time: packAverage || 0,
                displayName: name === `${JSON.parse(localStorage.getItem('@ViDash:_userInfo')).first_name} ${JSON.parse(localStorage.getItem('@ViDash:_userInfo')).last_name}` ? name + ' (You)' : ''
            }
        })

        setLoading(false)

        return newData
    }catch(err){
        console.log(err.response.status)
        if(err.response.status === 403 && window.location.href !== '/settings'){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
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