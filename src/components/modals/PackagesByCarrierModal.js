import PackagesByCarrierChart from "../charts/PackagesByCarrier/OrdersSentChart";
import PriceAverages from "../charts/PackagesByCarrier/PriceAverages";
import PriceTotals from "../charts/PackagesByCarrier/PriceTotals";
import TableOfData from "../charts/PackagesByCarrier/TableOfData";

import { useState } from "react";

export default function PackagesByCarrierModal({ dateRange, setDateRange }) {
    const [showTable, setShowTable] = useState(false);

    return(
        <div className="w-full flex flex-row flex-around">
            
            <div className="w-full flex flex-col justify-start items-center mr-2">
                <div className='w-full'>
                    <div className='mt-2 text-black text-lg bg-stone-300 p-2'>Packages By Carrier</div>
                    <div className='w-full bg-stone-200 rounded h-96 text-sm p-4 mb-4 flex'>
                        <PackagesByCarrierChart dateRange={dateRange} />
                    </div>  
                </div>
                <div className='w-full' onClick={!showTable ? () => setShowTable(true) : () => {}}>
                    <div className='mt-2 text-black text-lg bg-stone-300 p-2'>Raw Data Table</div>
                    <div className='w-full bg-stone-200 rounded h-48 text-sm p-4 mb-4 flex'>
                        {showTable ?
                            <TableOfData dateRange={dateRange} setShowTable={setShowTable} /> :
                            <div className='w-full flex flex-col justify-center items-center'>
                                <div className='text-black text-lg'>Click to view table</div>
                            </div>
                        }
                    </div>  
                </div>
            </div>

            <div className="w-full flex flex-col justify-between items-center ml-2">
                <div className='w-full'>
                    <div className='mt-2 text-black text-lg bg-stone-300 p-2'>Total Gain/Loss</div>
                    <div className='w-full bg-stone-200 rounded h-72 text-sm p-4 mb-4 flex'>
                        <PriceTotals dateRange={dateRange} />
                    </div>  
                </div>
                <div className='w-full'>
                    <div className='mt-2 text-black text-lg bg-stone-300 p-2'>Average Gain/Loss</div>
                    <div className='w-full bg-stone-200 rounded h-72 text-sm p-4 mb-4 flex'>
                        <PriceAverages dateRange={dateRange} />
                    </div>  
                </div>
            </div>
            
        </div>
    )
}