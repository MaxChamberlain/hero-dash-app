import { useContext, useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function BestPacker() {
    const [dimensions, setDimensions] = useState({ height: window.innerHeight, width: window.innerWidth });

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimensions({ height: window.innerHeight, width: window.innerWidth });
        })
    }, [])

    const PickDataContext = useContext(PickDatacontext)
    const canDrillDown = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canDrillDown || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin
    console.log(PickDataContext.loading)

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
            PickDataContext.pickerPersonData.length > 0 && <>
                <div className='mt-12 text-black text-base bg-stone-300 p-1'>Best Packer</div>
                
                <div className='w-full bg-stone-200 rounded text-sm p-4 mb-4 flex justify-center' style={{ height: 290 }}>
                    <div className='w-full border-stone-300 border-2 p-2'>
                        <div className='w-full text-black text-base bg-stone-300 p-1'>
                            By Items: {canDrillDown ?
                            PickDataContext.pickerPersonData.sort((a, b) => b.items_packed - a.items_packed)[0].name :
                            PickDataContext.pickerPersonData.sort((a, b) => b.items_packed - a.items_packed)[0].displayName
                            }
                        </div>
                        <div className={`w-full text-black text-${dimensions.width > 1080 ? 'base' : 'xs'} p-1`}>
                            
                            <div className='flex items-center'>
                                <div style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#ff8000',
                                    marginRight: 20,
                                    borderRadius: '50%',
                                }}></div>
                                <div className='flex flex-col mt-5'>
                                    <div>Packages Packed</div>
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.items_packed - a.items_packed)[0].packages_packed} items
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
                                    <div>Items Packed</div>
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.items_packed - a.items_packed)[0].items_packed} orders
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
                                    <div>Avg Pack Time</div>
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.items_packed - a.items_packed)[0].avg_pack_time} sec/pack
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='w-full border-stone-300 border-2 p-2'>
                        <div className='w-full text-black text-base bg-stone-300 p-1'>
                            By Packages: {canDrillDown ? 
                            PickDataContext.pickerPersonData.sort((a, b) => b.packages_packed - a.packages_packed)[0].name :
                            PickDataContext.pickerPersonData.sort((a, b) => b.packages_packed - a.packages_packed)[0].displayName
                        }
                        </div>
                        <div className={`w-full text-black text-${dimensions.width > 1080 ? 'base' : 'xs'} p-1`}>
                            
                            <div className='flex items-center'>
                                <div style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#ff8000',
                                    marginRight: 20,
                                    borderRadius: '50%',
                                }}></div>
                                <div className='flex flex-col mt-5'>
                                    <div>Packages Packed</div>
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.packages_packed - a.packages_packed)[0].packages_packed} items
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
                                    <div>Items Packed</div>
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.packages_packed - a.packages_packed)[0].items_packed} orders
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
                                    <div>Avg Pack Time</div>
                                    {PickDataContext.pickerPersonData.sort((a, b) => b.packages_packed - a.packages_packed)[0].avg_pack_time} sec/pack
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </>
        )
    }
}