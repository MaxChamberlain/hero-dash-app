import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../assets/graphs/Legend';
import { CustomTooltip } from '../../assets/graphs/Tooltip';
import Loading from '../Loading';
const { PickDatacontext } = require('../../contexts/DataContext');

export default function TotalPickerPerformanceChart() {

    const PickDataContext = useContext(PickDatacontext)
    const canDrillDown = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canDrillDown || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin

    if(PickDataContext.loading.person_data){
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
                <BarChart data={PickDataContext.pickerPersonData}>
                    <Legend content={CustomizedLegend} />
                    <XAxis dataKey={canDrillDown ? "name" : "displayName"} />
                    <YAxis />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="items_picked" fill="#2b59f2" />
                    <Bar dataKey="orders_picked" fill="#7f2bf2" />
                    <Bar dataKey="items_packed" fill="#ffbb00" />
                    <Bar dataKey="packages_packed" fill="#ff8000" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}