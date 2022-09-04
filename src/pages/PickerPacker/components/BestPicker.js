import { useState, useEffect } from 'react';
import { getData } from "../../../utils/functions/temp_get_db_person_data"
import Loading from '../../../components/Loading';

export default function BestPicker({ dateRange, setDateRange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData(dateRange.startDate, dateRange.endDate, setLoading, setError);
            setData(returnedData)
        }
        refreshData()
    }, [dateRange])

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData(dateRange.startDate, dateRange.endDate, setLoading, setError);
            setData(returnedData)
        }
        refreshData()
    }, [])

    useEffect(() => {
        if(error){
            setLoading(false)
        }
    }, [error])

    console.log(data)

    if(loading){
        return <Loading />
    }else if(error){
        return(
            <div>Error</div>
        )
    }else{
        return(
            data.length > 0 && <>
                <div className='mt-0 text-black text-lg bg-stone-300 p-1'>Best Picker</div>
                
                <div className='w-full bg-stone-200 rounded text-lg p-4 mb-4 flex justify-center' style={{ height: 290 }}>
                    <div className='w-full border-stone-300 border-2 p-2'>
                        <div className='w-full text-black text-base bg-stone-300 p-1'>
                            By Items: {data.sort((a, b) => b.items_picked - a.items_picked)[0].name}
                        </div>
                        <div className='w-full text-black text-base p-1'>
                            
                            <div className='flex items-center'>
                                <div style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#ff8000',
                                    marginRight: 20,
                                    borderRadius: '50%',
                                }}></div>
                                <div className='flex flex-col mt-5'>
                                    <div>Orders Picked</div>
                                    {data.sort((a, b) => b.items_picked - a.items_picked)[0].orders_picked} items
                                </div>
                            </div>
                            
                            <div className='flex items-center'>
                                <div style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#ffbb00',
                                    marginRight: 20,
                                    borderRadius: '50%',
                                }}></div>
                                <div className='flex flex-col mt-5'>
                                    <div>Items Picked</div>
                                    {data.sort((a, b) => b.items_picked - a.items_picked)[0].items_picked} orders
                                </div>
                            </div>
                            
                            <div className='flex items-center'>
                                <div style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'blue',
                                    marginRight: 20,
                                    borderRadius: '50%',
                                }}></div>
                                <div className='flex flex-col mt-5'>
                                    <div>Avg Pick Time</div>
                                    {data.sort((a, b) => b.items_picked - a.items_picked)[0].avg_pick_time} sec/pick
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='w-full border-stone-300 border-2 p-2'>
                        <div className='w-full text-black text-lg bg-stone-300 p-1'>
                            By Orders: {data.sort((a, b) => b.orders_picked - a.orders_picked)[0].name}
                        </div>
                        <div className='w-full text-black text-base p-1'>
                            
                            <div className='flex items-center'>
                                <div style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#ff8000',
                                    marginRight: 20,
                                    borderRadius: '50%',
                                }}></div>
                                <div className='flex flex-col mt-5'>
                                    <div>Orders Picked</div>
                                    {data.sort((a, b) => b.orders_picked - a.orders_picked)[0].orders_picked} items
                                </div>
                            </div>
                            
                            <div className='flex items-center'>
                                <div style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#ffbb00',
                                    marginRight: 20,
                                    borderRadius: '50%',
                                }}></div>
                                <div className='flex flex-col mt-5'>
                                    <div>Items Picked</div>
                                    {data.sort((a, b) => b.orders_picked - a.orders_picked)[0].items_picked} orders
                                </div>
                            </div>
                            
                            <div className='flex items-center'>
                                <div style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'blue',
                                    marginRight: 20,
                                    borderRadius: '50%',
                                }}></div>
                                <div className='flex flex-col mt-5'>
                                    <div>Avg Pick Time</div>
                                    {data.sort((a, b) => b.orders_picked - a.orders_picked)[0].avg_pick_time} sec/pick
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </>
        )
    }
}