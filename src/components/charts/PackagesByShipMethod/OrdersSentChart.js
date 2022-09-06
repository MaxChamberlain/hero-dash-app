import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function OrdersSentChart() {

    const PickDataContext = useContext(PickDatacontext)

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
                    <BarChart data={PickDataContext.methodData.filter(e => e.method)}>
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