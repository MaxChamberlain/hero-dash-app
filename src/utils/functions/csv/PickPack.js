import { CSVDownload } from 'react-csv'
const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export const getData = async (dateRange, setDownloadable) => {
    try{
        console.log('starting download')
        const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
        const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
        const startDate = new Date(dateRange.startDate.setHours(0,0,0,0))
        const endDate = new Date(dateRange.endDate.setHours(23,59,59,999))

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
        const uniqueDates = [...new Set([...pickData.map(item => item.created_at.slice(0,10)), ...packData.map(item => item.created_at.slice(0,10))])]

        const newData = uniqueDates.map(date => {
            return names.map(name => {
                const filteredData = pickData.filter(item => `${item.user_first_name} ${item.user_last_name}` === name && item.created_at.slice(0,10) === date)
                const filteredPackData = packData.filter(item => `${item.user_first_name} ${item.user_last_name}` === name && item.created_at.slice(0,10) === date)
    
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
                    date: new Date(date).toLocaleDateString('en-US'),
                    data: {
                        name: name.split(' ')[0] + ' ' + name.split(' ')[1].charAt(0),
                        items_picked: filteredData.length || 0,
                        orders_picked: [...new Set(filteredData.map(e => e.order_number))].length || 0,
                        items_packed: filteredPackData.reduce((acc, curr) => acc + curr.total_items, 0) || 0,
                        packages_packed: filteredPackData.length || 0,
                        avg_pick_time: average || 0,
                        avg_pack_time: packAverage || 0,
                        displayName: name
                    }
                }
            })
        })

        const csvHeaders = [
            { label: 'Date', key: 'date' },
            { label: 'Name', key: 'name' },
            { label: 'Items Picked', key: 'items_picked' },
            { label: 'Orders Picked', key: 'orders_picked' },
            { label: 'Items Packed', key: 'items_packed' },
            { label: 'Packages Packed', key: 'packages_packed' },
            { label: 'Avg Pick Time (sec)', key: 'avg_pick_time' },
            { label: 'Avg Pack Time (sec)', key: 'avg_pack_time' },
        ]

        const csvData = newData.flat().map(item => {
            return {
                date: item.date,
                name: item.data.displayName,
                items_picked: item.data.items_picked,
                orders_picked: item.data.orders_picked,
                items_packed: item.data.items_packed,
                packages_packed: item.data.packages_packed,
                avg_pick_time: item.data.avg_pick_time,
                avg_pack_time: item.data.avg_pack_time,
            }
        })

        setDownloadable(
            <CSVDownload
                data={csvData}
                headers={csvHeaders}
                filename={`pick-pack-data-${startDate.toLocaleDateString('en-US')}-${endDate.toLocaleDateString('en-US')}.csv`}
            />
        )
        setTimeout(() => setDownloadable(false), 100)
        
    }catch(err){
        console.log(err.response.status)
        if(err.response.status === 403 && window.location.href !== '/settings'){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
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