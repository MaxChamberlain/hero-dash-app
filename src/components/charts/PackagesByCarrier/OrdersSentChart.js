import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function OrdersSentChart() {

    const PickDataContext = useContext(PickDatacontext)

    if(PickDataContext.loading.carrier_data){
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
                    <BarChart data={PickDataContext.carrierData.filter(e => e.carrier)}>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <XAxis dataKey="carrier" />
                        <YAxis />
                        <Bar dataKey='packages_sent' fill="#2b59f2" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }
}