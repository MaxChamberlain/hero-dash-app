import { useState, useEffect } from 'react';
import { getData } from "../../utils/functions/temp_get_db_person_data"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../assets/graphs/Legend';
import { CustomTooltip } from '../../assets/graphs/Tooltip';
import Loading from '../Loading';

export default function PickerPerformanceChart({ dateRange, setDateRange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData(dateRange.startDate, dateRange.endDate, setLoading, setError);
            setData(returnedData.sort((a, b) => (a.items_picked < b.items_picked) ? 1 : -1))
        }
        refreshData()
    }, [dateRange])

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData(dateRange.startDate, dateRange.endDate, setLoading, setError);
            setData(returnedData.sort((a, b) => (a.items_picked < b.items_picked) ? 1 : -1))
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
                <BarChart data={data.filter(e => e.items_picked > 0)}>
                    <Legend content={CustomizedLegend} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="items_picked" fill="#2b59f2" />
                    <Bar dataKey="orders_picked" fill="#7f2bf2" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}