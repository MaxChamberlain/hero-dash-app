import { useContext, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function PriceAverages ({ dateRange, setDateRange }) {
    const [methodData, setMethodData] = useState([]);
    const PickDataContext = useContext(PickDatacontext)

    useEffect(() => {
        const methods = [...new Set(PickDataContext.methodData.map(method => method.method))]
        let newData = []
        methods.forEach(method => {
            let temp = PickDataContext.methodData.filter(methodData => methodData.method === method)
            if(method){
                let tempObj = {
                    method: method,
                    total_in_price: temp.reduce((acc, curr) => acc + curr.total_in_price, 0),
                    total_out_cost: temp.reduce((acc, curr) => acc + curr.total_out_cost, 0)
                }
                newData.push(tempObj)
            }
        })
        setMethodData(newData)
    }, [PickDataContext.methodData])


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
                    <BarChart data={methodData} layout='vertical'>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <YAxis orientation='left' type='category' dataKey="method" style={{ fontSize: 15, }} />
                        <XAxis type='number' />
                        <Bar dataKey='total_in_price' fill="#ffbb00" />
                        <Bar dataKey='total_out_cost' fill="#ff8000" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }
}