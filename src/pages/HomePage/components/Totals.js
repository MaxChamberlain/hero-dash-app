import { useState, useEffect } from 'react';
import { getData } from "../../../utils/functions/temp_get_db_package_data"
import Loading from '../../../components/Loading';

export default function Totals({ dateRange, setDateRange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData('test', dateRange, setLoading);
            setData(returnedData)
        }
        refreshData()
    }, [dateRange])

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData('test', dateRange, setLoading);
            setData(returnedData)
        }
        refreshData()
    }, [])

    return(
        data && <div className='mt-10 bg-stone-200 p-2 rounded text-black md:text-xl text-lg flex justify-around items-center text-center'>
            
        {loading ? <Loading /> : <>
        <div style={{
            width: 2,
        }}>
        </div>

            <div className=''>
                <div className='md:text-lg text-base'>Orders Sent</div>
                <div>{
                    Math.round((data.reduce((a, b) => {return a + b.orders_sent}, 0)) * 100) / 100    
                }</div>
            </div>
            
            <div style={{
                width: 2,
                height: 80,
                backgroundColor: 'black',
                borderRadius: '100%',
                opacity: 0.1
            }}>
            </div>

            <div className=''>
                <div className='md:text-lg text-base'>Earned from Shipping</div>
                <div>${
                    Math.round((data.reduce((a, b) => {return a + b.total_in_price}, 0)) * 100) / 100    
                }</div>
            </div>
            
            <div style={{
                width: 2,
                height: 80,
                backgroundColor: 'black',
                borderRadius: '100%',
                opacity: 0.1
            }}>
            </div>

            <div className=''>
                <div className='md:text-lg text-base'>Spent on Shipping</div>
                <div>${
                    Math.round((data.reduce((a, b) => {return a + b.total_out_cost}, 0)) * 100) / 100    
                }</div>
            </div>
            
            <div style={{
                width: 2,
            }}>
            </div>
        </>}

        </div>
    )
}