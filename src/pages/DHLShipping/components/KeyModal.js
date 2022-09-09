export const KeyModal = ({ data, selectedState, zoneData }) => {

    const zoneColors = {
        0: '#ccc',
        1: '#ffbb00',
        2: '#ff2600',
        3: '#e100ff',
        4: '#7745b5',
        5: '#2e62f2',
        6: '#3f8296',
        7: '#6fa69e',
        8: '#26a664',
        9: '#62bd39',
        10: '#a5b55c',
    }

    const zone = zoneData.find(e => {
        const zoneZone = e.zone.split(' ')[1]
        const stateZone = data.find(x => x.id === selectedState.id) ? data.find(x => x.id === selectedState.id).zone_number : 0
        return zoneZone === stateZone
    })
    console.log(zone)

    return(
        <div className="bg-white rounded ml-12 h-fit text-black text-lg w-2/3">
            <div className="flex flex-col w-full bg-stone-200 text-center">
                <div className="flex justify-center items-center">
                    <div style={{
                        backgroundColor: zoneColors[zone ? zone.zone.split(' ')[1] : 0],
                        width: '20px',
                        height: '20px',
                        marginRight: 20,
                        borderRadius: '50%'
                    }}></div>
                    <h1 className="text-2xl">{zone ? zone.zone : 'Select a Zone'}</h1>
                </div>
                {zone &&
                <>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Packages Sent: <span>{zone ? zone.packages_sent : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Cost of Shipping: <span>${zone ? zone.total_out_cost : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Earned From Shipping: <span>${zone ? zone.total_in_price : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Average Cost of Shipping: <span>${zone ? zone.avg_out_cost : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Average Earned From Shipping: <span>${zone ? zone.avg_in_price : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Total Earned From Orders: <span>${zone ? zone.total_order_price : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Average Earned From Orders: <span>${zone ? zone.avg_order_price : 0}</span></div>
                </>
                }
            </div>
        </div>
    )
}