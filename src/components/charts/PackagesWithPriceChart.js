import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../assets/graphs/Legend';
import { CustomTooltip } from '../../assets/graphs/Tooltip';
import Loading from '../Loading';
const { PickDatacontext } = require('../../contexts/DataContext');

export default function PickerPerformanceChart() {

    const PickDataContext = useContext(PickDatacontext)

    if(PickDataContext.loading.package_data){
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
                <ResponsiveContainer width='50%' height='100%'>
                    <BarChart data={PickDataContext.packagesDataConsolidated}>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey='total_in_(Gain)' fill="#2b59f2" />
                        <Bar dataKey='total_out_(Loss)' fill="#7f2bf2" />
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width='50%' height='100%'>
                    <BarChart data={PickDataContext.packagesDataConsolidated}>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <XAxis dataKey="name" />
                        <YAxis orientation='right' />
                        <Bar dataKey='avg_in_(Gain)' fill="#ffbb00" />
                        <Bar dataKey='avg_out_(Loss)' fill="#ff8000" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }
}