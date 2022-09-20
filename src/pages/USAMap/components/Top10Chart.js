import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomizedLegend } from '../../../assets/graphs/Legend';
import { CustomTooltip } from '../../../assets/graphs/Tooltip';
import Loading from '../../../components/Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function Top10Chart() {

    const PickDataContext = useContext(PickDatacontext)
    const top10byvolume = PickDataContext.stateData.sort((a, b) => b.packages_sent - a.packages_sent).slice(0,10)
    const top10byshipcost = PickDataContext.stateData.sort((a, b) => b.total_out_cost - a.total_out_cost).slice(0,10)
    const top10byavgshipcost = PickDataContext.stateData.sort((a, b) => b.avg_out_cost - a.avg_out_cost).slice(0,10)
    const top10byorderprice = PickDataContext.stateData.sort((a, b) => b.total_order_price - a.total_order_price).slice(0,10)
    const top10byavgorderprice = PickDataContext.stateData.sort((a, b) => b.avg_order_price - a.avg_order_price).slice(0,10)

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
            <div className='w-full flex flex-col'>
                <div className='flex justify-between'>
                    <div className='flex flex-col w-full'>
                        <div className='mt-12 text-black text-lg bg-stone-300 p-2'>Packages Sent</div>
                        <div className='w-full bg-stone-200 rounded h-96 text-sm p-4 mb-4 flex'>
                            <ResponsiveContainer width='100%' height='100%'>
                                <BarChart data={top10byvolume}>
                                    <Tooltip content={CustomTooltip} />
                                    <Legend content={CustomizedLegend} />
                                    <XAxis dataKey="state" />
                                    <YAxis />
                                    <Bar dataKey='packages_sent' fill="#2b59f2" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between' style={{ height: 800 }}>
                    <div className='flex flex-col w-1/2 ml-2 h-full'>
                        <div className='mt-12 text-black text-lg bg-stone-300 p-2'>Total Shipping</div>
                        <div className='w-full bg-stone-200 rounded text-sm p-4 mb-4 flex h-full'>
                            <ResponsiveContainer width='100%' height='100%'>
                                <BarChart data={top10byshipcost} layout='vertical' >
                                    <Tooltip content={CustomTooltip} />
                                    <Legend content={CustomizedLegend} />
                                    <XAxis reversed type='number' />
                                    <YAxis orientation='right' type='category' dataKey="state" />
                                    <Bar dataKey='total_out_cost' fill="#ffbb00" />
                                    <Bar dataKey='total_in_price' fill="#ff8000" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2 ml-2 h-full'>
                        <div className='mt-12 text-black text-lg bg-stone-300 p-2'>Average Shipping</div>
                        <div className='w-full bg-stone-200 rounded text-sm p-4 mb-4 flex h-full'>
                            <ResponsiveContainer width='100%' height='100%'>
                                <BarChart data={top10byavgshipcost} layout='vertical' >
                                    <Tooltip content={CustomTooltip} />
                                    <Legend content={CustomizedLegend} />
                                    <XAxis type='number' />
                                    <YAxis type='category' dataKey="state" />
                                    <Bar dataKey='avg_out_cost' fill="#ffbb00" />
                                    <Bar dataKey='avg_in_price' fill="#ff8000" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className='mt-12' id='order-section'>
                    Orders
                </div>
                <div className='bg-slate-300 w-5/6 h-0.5 -mb-8' style={{ borderRadius: '0 50% 50% 0' }}></div>
                <div className='flex justify-between' style={{ height: 800 }}>
                    <div className='flex flex-col w-1/2 ml-2 h-full'>
                        <div className='mt-12 text-black text-lg bg-stone-300 p-2'>Order Totals</div>
                        <div className='w-full bg-stone-200 rounded text-sm p-4 mb-4 flex h-full'>
                            <ResponsiveContainer width='100%' height='100%'>
                                <BarChart data={top10byorderprice} layout='vertical' >
                                    <Tooltip content={CustomTooltip} />
                                    <Legend content={CustomizedLegend} />
                                    <XAxis reversed type='number' />
                                    <YAxis orientation='right' type='category' dataKey="state" />
                                    <Bar dataKey='total_order_price' fill="#ffbb00" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2 ml-2 h-full'>
                        <div className='mt-12 text-black text-lg bg-stone-300 p-2'>Average Order Total</div>
                        <div className='w-full bg-stone-200 rounded text-sm p-4 mb-4 flex h-full'>
                            <ResponsiveContainer width='100%' height='100%'>
                                <BarChart data={top10byavgorderprice} layout='vertical' >
                                    <Tooltip content={CustomTooltip} />
                                    <Legend content={CustomizedLegend} />
                                    <XAxis type='number' />
                                    <YAxis type='category' dataKey="state" />
                                    <Bar dataKey='avg_order_price' fill="#ffbb00" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}