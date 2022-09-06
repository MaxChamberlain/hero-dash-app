import { useContext } from 'react';
import Loading from '../../../components/Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function BestPicker() {

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
            PickDataContext.pickerPersonData.length > 0 && <>
                <div className='mt-0 text-black text-lg bg-stone-300 p-1'>Best Picker</div>
                
                <div className='w-full bg-stone-200 rounded text-lg p-4 mb-4 flex justify-center' style={{ height: 290 }}>
                    <div className='w-full border-stone-300 border-2 p-2'>
                        <div className='w-full text-black text-base bg-stone-300 p-1'>
                            By Items: {PickDataContext.pickerPersonData.sort((a, b) => b.items_picked - a.items_picked)[0].name}
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
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.items_picked - a.items_picked)[0].orders_picked} items
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
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.items_picked - a.items_picked)[0].items_picked} orders
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
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.items_picked - a.items_picked)[0].avg_pick_time} sec/pick
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='w-full border-stone-300 border-2 p-2'>
                        <div className='w-full text-black text-lg bg-stone-300 p-1'>
                            By Orders: {PickDataContext.pickerPersonData.sort((a, b) => b.orders_picked - a.orders_picked)[0].name}
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
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.orders_picked - a.orders_picked)[0].orders_picked} items
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
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.orders_picked - a.orders_picked)[0].items_picked} orders
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
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.orders_picked - a.orders_picked)[0].avg_pick_time} sec/pick
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </>
        )
    }
}