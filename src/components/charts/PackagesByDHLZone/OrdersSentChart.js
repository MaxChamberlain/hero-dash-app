import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function OrdersSentChart() {

    const zoneColors = {
        0: '#ccc',
        1: '#ffbb00',
        2: '#ff2600',
        3: '#e100ff',
        4: '#7745b5',
        5: '#2e62f2',
        6: '#3f8296',
        7: '#6fa69e',
        8: '#26a664',
        9: '#62bd39',
        10: '#a5b55c',
    }

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
                    <BarChart data={PickDataContext.dhlZoneData}>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <XAxis dataKey="zone" />
                        <YAxis />
                        <Bar dataKey='packages_sent'>
                            {
                                PickDataContext.dhlZoneData.map((entry, index) => {
                                    return <Cell key={`cell-${index}`} fill={zoneColors[entry.zone.split(' ')[1]]} />
                                })
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }
}