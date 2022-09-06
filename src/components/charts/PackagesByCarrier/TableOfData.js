import { useState, useEffect } from 'react';
import { getData } from "../../../utils/functions/temp_get_db_carrier_data"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../Loading';

export default function PriceAverages ({ dateRange, setDateRange, setShowTable }) {
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
                    total_packages: temp.reduce((acc, curr) => acc + curr.orders_sent, 0),
                    total_in_price: temp.reduce((acc, curr) => acc + curr.total_in_price, 0),
                    total_out_cost: temp.reduce((acc, curr) => acc + curr.total_out_cost, 0),
                    avg_in_price: temp.reduce((acc, curr) => acc + curr.avg_in_price, 0) / temp.length,
                    avg_out_cost: temp.reduce((acc, curr) => acc + curr.avg_out_cost, 0) / temp.length,
                }
                newData.push(tempObj)
            }
        })
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
            <div className='w-screen h-screen fixed top-0 left-0 z-[9998] flex justify-center items-center text-white' style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <div className='p-4 w-11/12 bg-slate-800 rounded'>
                    <div className='flex justify-center items-center relative'>
                        <div className='text-2xl font-bold mb-8'>Carrier Data</div>
                        <div className='absolute right-4 top-0 cursor-pointer text-2xl' onClick={() => setShowTable(false)}>x</div>
                    </div>
                    {carrierData.length > 0 && <table className='table-auto w-full text-lg'>
                        <tbody>
                            <tr className='font-bold'>
                                <td> </td>
                                {Object.keys(carrierData[0]).map((key, index) => {
                                    return <td key={index}>{key.split('_').join(' ')}</td>
                                })}
                            </tr>
                            {carrierData.map((carrier, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {Object.values(carrier).map((value, index) => {
                                            return <td key={index}>{value}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        )
    }
}