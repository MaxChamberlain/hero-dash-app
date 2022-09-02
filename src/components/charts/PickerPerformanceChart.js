import { useState, useEffect } from 'react';
import { getData } from "../../utils/functions/temp_get_db_data"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../assets/graphs/Legend';
import { CustomTooltip } from '../../assets/graphs/Tooltip';

export default function PickerPerformanceChart({ dateRange, setDateRange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData('test', dateRange.startDate, dateRange.endDate);
            setData(returnedData)
        }
        refreshData()
    }, [dateRange])

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData('test', dateRange.startDate, dateRange.endDate);
            setData(returnedData)
        }
        refreshData()
    }, [])

    useEffect(() => {
        if(error){
            setLoading(false)
        }
    }, [error])

    useEffect(() => {
        setTimeout(() => {
            setError(true)
        }, 10000)
    }, [])

    if(loading){
        return(
            <div>Loading...</div>
        )
    }else if(error){
        return(
            <div>Error</div>
        )
    }else{
        return(
            <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={data}>
                    <Legend content={CustomizedLegend} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="items_picked" fill="#2b59f2" />
                    <Bar dataKey="orders_picked" fill="#7f2bf2" />
                    <Bar dataKey="items_packed" fill="#ffbb00" />
                    <Bar dataKey="orders_packed" fill="#ff8000" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}