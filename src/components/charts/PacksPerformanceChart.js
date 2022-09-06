import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../assets/graphs/Legend';
import { CustomTooltip } from '../../assets/graphs/Tooltip';
import Loading from '../Loading';
const { PickDatacontext } = require('../../contexts/DataContext');

export default function PickerPerformanceChart() {

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
            <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={PickDataContext.packData.filter(e => e.items_packed > 0)}>
                    <Legend content={CustomizedLegend} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="items_packed" fill="#ffbb00" />
                    <Bar dataKey="orders_packed" fill="#ff8000" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}