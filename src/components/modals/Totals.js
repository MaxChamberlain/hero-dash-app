import { useContext } from 'react';
import Loading from '../Loading';
const { PickDatacontext } = require('../../contexts/DataContext');

export default function Totals() {

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
        <div className='mt-10 bg-stone-200 p-2 rounded text-black md:text-xl text-lg flex justify-around items-center text-center'>
            <div style={{
                width: 2,
            }}>
            </div>

                <div className=''>
                    <div className='md:text-lg text-base'>Orders Sent</div>
                    <div>{
                        Math.round((PickDataContext.totalsData.reduce((a, b) => {return a + b.orders_sent}, 0)) * 100) / 100    
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
                        Math.round((PickDataContext.totalsData.reduce((a, b) => {return a + b.total_in_price}, 0)) * 100) / 100    
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
                        Math.round((PickDataContext.totalsData.reduce((a, b) => {return a + b.total_out_cost}, 0)) * 100) / 100    
                    }</div>
                </div>
                
                <div style={{
                    width: 2,
                }}>
                </div>
            </div>
        )
    }
}