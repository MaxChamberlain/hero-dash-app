import { useContext, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function PriceTotals () {
    const [zoneData, setZoneData] = useState([]);
    const PickDataContext = useContext(PickDatacontext)

    useEffect(() => {
        const zones = [...new Set(PickDataContext.dhlZoneData.map(zone => zone.zone))]
        let newData = []
        zones.forEach(zone => {
            let temp = PickDataContext.dhlZoneData.filter(zoneData => zoneData.zone === zone)
            if(zone){
                let tempObj = {
                    zone: zone,
                    total_in_price: temp.reduce((acc, curr) => acc + curr.total_in_price, 0),
                    total_out_cost: temp.reduce((acc, curr) => acc + curr.total_out_cost, 0)
                }
                newData.push(tempObj)
            }
        })
        setZoneData(newData)
    }, [PickDataContext.dhlZoneData])


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
                    <BarChart data={zoneData} layout='vertical'>
                        <Tooltip content={CustomTooltip} />
                        <Legend content={CustomizedLegend} />
                        <YAxis orientation='right' type='category' dataKey="zone" style={{ fontSize: 15, }} />
                        <XAxis reversed type='number' />
                        <Bar dataKey='total_in_price' fill="#ffbb00" />
                        <Bar dataKey='total_out_cost' fill="#ff8000" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }
}