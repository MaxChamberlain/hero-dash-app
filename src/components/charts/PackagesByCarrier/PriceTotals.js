import { useState, useEffect } from 'react';
import { getData } from "../../../utils/functions/temp_get_db_carrier_data"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../Loading';

export default function PriceAverages ({ dateRange, setDateRange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [carrierData, setCarrierData] = useState([]);

    useEffect(() => {
        const carriers = [...new Set(data.map(carrier => carrier.carrier))]
        let newData = []
        carriers.forEach(carrier => {
            let temp = data.filter(carrierData => carrierData.carrier === carrier)
            if(carrier){
                let tempObj = {
                    carrier: carrier,
                    total_in_price: temp.reduce((acc, curr) => acc + curr.total_in_price, 0),
                    total_out_cost: temp.reduce((acc, curr) => acc + curr.total_out_cost, 0)
                }
                newData.push(tempObj)
            }
        })
        console.log(newData)
        setCarrierData(newData)
    }, [data])

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
                    <BarChart data={carrierData} layout='vertical'>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <YAxis orientation='right' type='category' dataKey="carrier" style={{ fontSize: 15, }} />
                        <XAxis reversed type='number' />
                        <Bar dataKey='total_in_price' fill="#ffbb00" />
                        <Bar dataKey='total_out_cost' fill="#ff8000" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }
}