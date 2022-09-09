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

    const zone = zoneData.filter(e => {
        console.log(data.find(x => x.id === selectedState.id))
        const zoneZone = e.zone.split(' ')[1]
        const stateZone = data.find(x => x.id === selectedState.id) ? data.find(x => x.id === selectedState.id).zone_number[0] : 0
        const stateZone2 = data.find(x => x.id === selectedState.id) ? data.find(x => x.id === selectedState.id).zone_number[data.find(x => x.id === selectedState.id).zone_number.length - 1] : 0
        return zoneZone === stateZone || zoneZone === stateZone2
    })

    let color1 = '#ccc'
    let color2 = '#ccc'
    let title = 'No Zone Selected'
    let stateOrders = 0
    let stateEarnedShip = 0
    let stateSpentShip = 0

    if(data.find(x => x.id === selectedState.id)){
        stateOrders = data.find(x => x.id === selectedState.id).packages_sent
        stateEarnedShip = data.find(x => x.id === selectedState.id).total_in_price
        stateSpentShip = data.find(x => x.id === selectedState.id).total_out_cost
    }

    if(zone && zone.length > 0) {
        color1 = zoneColors[zone[0].zone.split(' ')[1]]
        title = zone[0].zone
        if(zone.length > 1){
            color2 = zoneColors[zone[1].zone.split(' ')[1]]
            title = zone[0].zone + ' & ' + zone[1].zone
        }
        if(selectedState){
            title += ' (' + selectedState.properties.name + ')'
        }
    }

    return(
        <div className="bg-white rounded ml-12 h-fit text-black text-lg w-2/3">
            <div className="flex flex-col w-full bg-stone-200 text-center">
                {zone && <>
                <div className="flex justify-center items-center">
                    <div style={{
                        backgroundColor: color1,
                        width: '20px',
                        height: '20px',
                        marginRight: 20,
                        borderRadius: '50%'
                    }}></div>
                    {zone && zone.length > 1 &&
                        <div style={{
                            backgroundColor: color2,
                            width: '20px',
                            height: '20px',
                            marginRight: 20,
                            borderRadius: '50%'
                        }}></div>
                    }
                    <h1 className="text-2xl">{title}</h1>
                </div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Packages Sent: <span>{zone.length > 0 ? zone.reduce((a, b) => a + b.packages_sent, 0) : 0} ({Math.round((stateOrders / (zone.length > 0 ? zone.reduce((a, b) => a + b.packages_sent, 0) : 1)) * 100)}%)</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Cost of Shipping: <span className="text-red-600">${zone.length > 0 ? zone.reduce((a, b) => a + b.total_out_cost, 0) : 0} ({Math.round((stateSpentShip / (zone.length > 0 ? zone.reduce((a, b) => a + b.total_out_cost, 0) : 1)) * 100)}%)</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Earned From Shipping: <span className="text-green-700">${zone.length > 0 ? zone.reduce((a, b) => a + b.total_in_price, 0) : 0} ({Math.round((stateEarnedShip / (zone.length > 0 ? zone.reduce((a, b) => a + b.total_in_price, 0) : 1)) * 100)}%)</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Average Cost of Shipping: <span className="text-red-600">${zone.length > 0 ? zone[0].avg_out_cost : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Average Earned From Shipping: <span className="text-green-700">${zone.length > 0 ? zone[0].avg_in_price : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Total Earned From Orders: <span className="text-green-700">${zone.length > 0 ? zone.reduce((a, b) => a + b.total_order_price, 0) : 0}</span></div>
                    <div className="text-center w-full mb-2 flex justify-between p-2">Average Earned From Orders: <span className="text-green-700">${zone.length > 0 ? zone[0].avg_order_price : 0}</span></div>
                </>
                }
            </div>
        </div>
    )
}