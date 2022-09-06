import { useState, useEffect } from 'react';
import { getData } from "../../../utils/functions/temp_get_db_carrier_data"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../Loading';

export default function PickerPerformanceChart({ dateRange, setDateRange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData(dateRange, setLoading, setError);
            setData(returnedData)
        }
        refreshData()
    }, [dateRange])

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData(dateRange, setLoading, setError);
            setData(returnedData)
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
            <div>Error</div>
        )
    }else{
        return(
            <>
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={data}>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <XAxis dataKey="carrier" />
                        <YAxis />
                        <Bar dataKey='orders_sent' fill="#2b59f2" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }
}