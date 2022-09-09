import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function packagesSentChart() {

    const PickDataContext = useContext(PickDatacontext)
    console.log(PickDataContext)

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
                    <BarChart data={PickDataContext.dhlZoneData}>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <XAxis dataKey="zone" />
                        <YAxis />
                        <Bar dataKey='packages_sent' fill="#2b59f2" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }
}