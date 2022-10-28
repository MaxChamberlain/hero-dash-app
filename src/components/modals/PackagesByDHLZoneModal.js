import OrdersSentChart from "../charts/PackagesByDHLZone/OrdersSentChart";
import PriceAverages from "../charts/PackagesByDHLZone/PriceAverages";
import PriceTotals from "../charts/PackagesByDHLZone/PriceTotals";
import TableOfData from "../charts/PackagesByDHLZone/TableOfData";

import { useState, useContext, useEffect } from "react";
import { PickDatacontext } from "../../contexts/DataContext";

export default function PackagesByDHLZoneModal({ dateRange, setDateRange }) {
    const [showTable, setShowTable] = useState(false);
    const [method, setMethod] = useState("All");
    const [methods, setMethods] = useState([]);
    const [data, setData] = useState([]);

    const dataContext = useContext(PickDatacontext);

    useEffect(() => {
        if(dataContext.dhlZoneData.length > 0){const methods = [...new Set(dataContext.dhlZoneData[0].ship_methods.map(e => e.method.replace('EXP', 'DHL SmartMail Parcel Expedited')))];
        setMethods(methods);}
    }, [dataContext.dhlZoneData]);

    useEffect(() => {
        if (method === "All") {
            setData(dataContext.dhlZoneData);
        } else {
            setData(dataContext.dhlZoneData.map(e => {
                const shipMethodsInObj = e.ship_methods.filter(e => e.method.replace('EXP', 'DHL SmartMail Parcel Expedited') === method);
                const returnObj = {
                    zone: e.zone,
                    packages_sent: shipMethodsInObj.reduce((acc, curr) => acc + curr.packages_sent, 0),
                    total_out_cost: shipMethodsInObj.reduce((acc, curr) => acc + curr.total_out_cost, 0),
                    total_in_price: shipMethodsInObj.reduce((acc, curr) => acc + curr.total_in_price, 0),
                    avg_out_cost: shipMethodsInObj.reduce((acc, curr) => acc + curr.avg_out_cost, 0) / shipMethodsInObj.length,
                    avg_in_price: shipMethodsInObj.reduce((acc, curr) => acc + curr.avg_in_price, 0) / shipMethodsInObj.length,
                }
                return returnObj;
            }));
        }
    }, [method, dataContext.dhlZoneData]);

    return(
        <div className="flex flex-col w-full">

            <div className="flex">
                {['All', ...methods].map(e => {
                    return(
                        <div className="text-sm p-2 m-2 bg-stone-200 rounded cursor-pointer" onClick={() => setMethod(e)}>{e}</div>
                    )
                })}
            </div>

            <div className="w-full flex flex-row flex-around">
                
                <div className="w-full flex flex-col justify-start items-center mr-2">
                    <div>
                    </div>
                    <div className='w-full'>
                        <div className='mt-2 text-black text-lg bg-stone-300 p-2'>Packages By Carrier ({method})</div>
                        <div className='w-full bg-stone-200 rounded h-96 text-sm p-4 mb-4 flex'>
                            <OrdersSentChart dateRange={dateRange} data={data} />
                        </div>  
                    </div>
                    <div className='w-full' onClick={!showTable ? () => setShowTable(true) : () => {}}>
                        <div className='mt-2 text-black text-lg bg-stone-300 p-2'>Raw Data Table</div>
                        <div className='w-full bg-stone-200 rounded h-48 text-sm p-4 mb-4 flex'>
                            {showTable ?
                                <TableOfData dateRange={dateRange} setShowTable={setShowTable} data={data} method={method} /> :
                                <div className='w-full flex flex-col justify-center items-center'>
                                    <div className='text-black text-lg'>Click to view table</div>
                                </div>
                            }
                        </div>  
                    </div>
                </div>

                <div className="w-full flex flex-col justify-between items-center ml-2">
                    <div className='w-full'>
                        <div className='mt-2 text-black text-lg bg-stone-300 p-2'>Total Gain/Loss ({method})</div>
                        <div className='w-full bg-stone-200 rounded h-72 text-sm p-4 mb-4 flex'>
                            <PriceTotals dateRange={dateRange} data={data} />
                        </div>  
                    </div>
                    <div className='w-full'>
                        <div className='mt-2 text-black text-lg bg-stone-300 p-2'>Average Gain/Loss ({method})</div>
                        <div className='w-full bg-stone-200 rounded h-72 text-sm p-4 mb-4 flex'>
                            <PriceAverages dateRange={dateRange} data={data} />
                        </div>  
                    </div>
                </div>
                
            </div>
        </div>
    )
}