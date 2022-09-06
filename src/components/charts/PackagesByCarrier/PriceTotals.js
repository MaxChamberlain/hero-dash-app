import { useContext, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function PriceTotals () {
    const [carrierData, setCarrierData] = useState([]);
    const PickDataContext = useContext(PickDatacontext)

    useEffect(() => {
        const carriers = [...new Set(PickDataContext.carrierData.map(carrier => carrier.carrier))]
        let newData = []
        carriers.forEach(carrier => {
            let temp = PickDataContext.carrierData.filter(carrierData => carrierData.carrier === carrier)
            if(carrier){
                let tempObj = {
                    carrier: carrier,
                    total_in_price: temp.reduce((acc, curr) => acc + curr.avg_in_price, 0) / temp.length,
                    total_out_cost: temp.reduce((acc, curr) => acc + curr.avg_out_cost, 0) / temp.length
                }
                newData.push(tempObj)
            }
        })
        setCarrierData(newData)
    }, [PickDataContext.carrierData])


    if(PickDataContext.loading){
        return <Loading />
    }else if(PickDataContext.error){
        return(
            <div className='text-red'>
                Error
            </div>
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