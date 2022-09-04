import { useState, useEffect } from 'react';
import { getData } from "../../utils/functions/temp_get_db_person_data"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../assets/graphs/Legend';
import { CustomTooltip } from '../../assets/graphs/Tooltip';
import Loading from '../Loading';

export default function TotalPickerPerformanceChart({ dateRange, setDateRange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData(dateRange.startDate, dateRange.endDate, setLoading, setError);
            setData(returnedData.sort((a, b) => (a.items_picked + a.items_packed < b.items_picked + b.items_packed) ? 1 : -1))
        }
        refreshData()
    }, [dateRange])

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData(dateRange.startDate, dateRange.endDate, setLoading, setError);
            setData(returnedData.sort((a, b) => (a.items_picked + a.items_packed < b.items_picked + b.items_packed) ? 1 : -1))
        }
        refreshData()
    }, [])

    useEffect(() => {
        if(error){
            setLoading(false)
        }
    }, [error])

    if(loading){
        return <Loading />
    }else if(error){
        return(
            <div className='text-red'>
                Error
            </div>
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