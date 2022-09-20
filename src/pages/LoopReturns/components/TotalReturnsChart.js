import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../../components/Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function TotalReturnsChart() {

    const PickDataContext = useContext(PickDatacontext)


    if(PickDataContext.loading.loop_data){
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
                    <BarChart data={PickDataContext.loopReturnsData.per_date}>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Bar dataKey='total_refunded' fill="#2b59f2" />
                        <Bar dataKey='exchange_total' fill="#7f2bf2" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }
}