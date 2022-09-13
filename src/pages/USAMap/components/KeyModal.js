export const KeyModal = ({ data, selectedState }) => {
    const state = data.find(e => e.id === selectedState.id)
    return(
        <div className="bg-white rounded ml-12 h-fit text-black text-lg w-full">
            <div className="flex flex-col w-full bg-stone-200">
                <div className="text-center bold p-2 text-xl bg-stone-300 mb-2">{selectedState ? selectedState.properties.name : 'Select a State'}</div>
                {selectedState &&
                <>
                    <div className="flex justify-between w-full text-sm" style={{ fontSize: window.innerWidth < 1080 ? 12 : 18 }}>
                    <div className="text-start w-full mb-2 flex items-center p-2 flex-col justify-between">Packages Sent: 
                            <div className='bg-slate-300 w-5/6 h-0.5 my-2' style={{ borderRadius: '0 50% 50% 0' }}></div>
                            <span className="text-start">{state ? state.packages_sent : 0}</span>
                        </div>
                        <div className="text-start w-full mb-2 flex items-center p-2 flex-col justify-between">Cost of Shipping: 
                            <div className='bg-slate-300 w-5/6 h-0.5 my-2' style={{ borderRadius: '0 50% 50% 0' }}></div>
                            <span>${state ? state.total_out_cost : 0}</span>
                        </div>
                        <div className="text-start w-full mb-2 flex items-center p-2 flex-col justify-between">Earned From Shipping: 
                            <div className='bg-slate-300 w-5/6 h-0.5 my-2' style={{ borderRadius: '0 50% 50% 0' }}></div>
                            <span>${state ? state.total_in_price : 0}</span>
                        </div>
                        <div className="text-start w-full mb-2 flex items-center p-2 flex-col justify-between">Average Cost of Shipping: 
                            <div className='bg-slate-300 w-5/6 h-0.5 my-2' style={{ borderRadius: '0 50% 50% 0' }}></div>
                            <span>${state ? state.avg_out_cost : 0}</span>
                        </div>
                        <div className="text-start w-full mb-2 flex items-center p-2 flex-col justify-between">Average Earned From Shipping: 
                            <div className='bg-slate-300 w-5/6 h-0.5 my-2' style={{ borderRadius: '0 50% 50% 0' }}></div>
                            <span>${state ? state.avg_in_price : 0}</span>
                        </div>
                        <div className="text-start w-full mb-2 flex items-center p-2 flex-col justify-between">Total Earned From Orders: 
                            <div className='bg-slate-300 w-5/6 h-0.5 my-2' style={{ borderRadius: '0 50% 50% 0' }}></div>
                            <span>${state ? state.total_order_price : 0}</span>
                        </div>
                        <div className="text-start w-full mb-2 flex items-center p-2 flex-col justify-between">Average Earned From Orders: 
                            <div className='bg-slate-300 w-5/6 h-0.5 my-2' style={{ borderRadius: '0 50% 50% 0' }}></div>
                            <span>${state ? state.avg_order_price : 0}</span>
                        </div>
                    </div>
                </>
                }
            </div>
        </div>
    )
}