export const KeyModal = ({ data, selectedState }) => {
    const state = data.find(e => e.id === selectedState.id)
    return(
        <div className="bg-white rounded ml-12 h-fit text-black text-lg w-2/3">
            <div className="flex flex-col w-full bg-stone-200">
                <div className="text-center bold p-2 text-xl bg-stone-300 mb-2">{selectedState ? selectedState.properties.name : 'Select a State'}</div>
                {selectedState &&
                <>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Packages Sent: <span>{state ? state.packages_sent : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Cost of Shipping: <span>${state ? state.total_out_cost : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Earned From Shipping: <span>${state ? state.total_in_price : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Average Cost of Shipping: <span>${state ? state.avg_out_cost : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Average Earned From Shipping: <span>${state ? state.avg_in_price : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Total Earned From Orders: <span>${state ? state.total_order_price : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Average Earned From Orders: <span>${state ? state.avg_order_price : 0}</span></div>
                </>
                }
            </div>
        </div>
    )
}