import { useState, useEffect } from 'react';
import { getData } from "../../utils/functions/temp_get_db_package_data_consolidated"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../assets/graphs/Legend';
import { CustomTooltip } from '../../assets/graphs/Tooltip';

export default function PickerPerformanceChart({ dateRange, setDateRange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData('test', dateRange, setLoading, setError);
            setData(returnedData)
        }
        refreshData()
    }, [dateRange])

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData('test', dateRange, setLoading, setError);
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
            <>
                <ResponsiveContainer width='50%' height='100%'>
                    <BarChart data={data}>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey='total_in_(Gain)' fill="#2b59f2" />
                        <Bar dataKey='total_out_(Loss)' fill="#7f2bf2" />
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width='50%' height='100%'>
                    <BarChart data={data}>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <XAxis dataKey="name" />
                        <YAxis orientation='right' />
                        <Bar dataKey='avg_in_(Gain)' fill="#ffbb00" />
                        <Bar dataKey='avg_out_(Loss)' fill="#ff8000" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }
}