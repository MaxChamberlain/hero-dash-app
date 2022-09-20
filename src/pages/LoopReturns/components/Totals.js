import { useContext } from 'react';
import Loading from '../../../components/Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function Totals() {

    const PickDataContext = useContext(PickDatacontext)

    if(PickDataContext.loading.loop_data){
        return <Loading />
    }else if(PickDataContext.error){
        return(
            <div className='text-red'>
                Error
            </div>
        )
    }else{
        return(
            PickDataContext.loopReturnsData && <>
                <div className='mt-10 bg-stone-200 p-2 rounded text-black md:text-xl text-lg flex justify-around items-center text-center'>
                    <div style={{
                        width: 2,
                    }}>
                    </div>

                    <div className=''>
                        <div className='md:text-lg text-base'>Returns Initiated</div>
                        <div>{
                            PickDataContext.loopReturnsData.totals?.total_returns
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
                        <div className='md:text-lg text-base'>Returns Processed</div>
                        <div>{
                            PickDataContext.loopReturnsData.totals?.total_processed
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
                        <div className='md:text-lg text-base'>Items Returned</div>
                        <div>{
                            PickDataContext.loopReturnsData.totals?.total_items
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
                        <div className='md:text-lg text-base'>Exchanges Initiated</div>
                        <div>{
                            PickDataContext.loopReturnsData.totals?.total_exchange_orders
                        }</div>
                    </div>
                    
                    <div style={{
                        width: 2,
                    }}>
                    </div>
                </div>
        <div className='bg-stone-200 p-2 rounded text-black md:text-xl text-lg flex justify-around items-center text-center'>
            <div style={{
                width: 2,
            }}>
            </div>

                <div className=''>
                    <div className='md:text-lg text-base'>Total Refunded</div>
                    <div>${
                        PickDataContext.loopReturnsData.totals?.total_refunded
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
                    <div className='md:text-lg text-base'>Earned from Exchanges</div>
                    <div>${
                        PickDataContext.loopReturnsData.totals?.exchange_total
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
                    <div className='md:text-lg text-base'>Net Gain/Loss</div>
                    <div>${
                        Math.round((PickDataContext.loopReturnsData.totals?.exchange_total - PickDataContext.loopReturnsData.totals?.total_refunded) * 100) / 100
                    }</div>
                </div>
                
                <div style={{
                    width: 2,
                }}>
                </div>
            </div>
            </>
        )
    }
}