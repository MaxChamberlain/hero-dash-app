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
                <BarChart data={PickDataContext.pickerPersonData.filter(e => e.items_picked > 0)}>
                    <Legend content={CustomizedLegend} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="items_picked" fill="rgb(43, 89, 242)" />
                    <Bar dataKey="orders_picked" fill="rgb(127, 43, 242)" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}