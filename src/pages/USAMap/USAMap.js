import React, { useState, useEffect, useContext } from "react";
import { Map } from './components/Map'
import { KeyModal } from './components/KeyModal'
import Loading from '../../components/Loading'
import CustDatePicker from '../../components/CustDatePicker'
import Top10Chart from "./components/Top10Chart";
import NavPage from "./components/NavPage";
const { PickDatacontext } = require('../../contexts/DataContext')

export default function USAMap(){
    const [selectedState, setSelectedState] = useState('')
    const packagesData = useContext(PickDatacontext);

    if (packagesData.loading) {
        return <Loading />;
    } else if (packagesData.error) {
        return <div className="text-red">Error</div>;
    } else {
        return (
            <div className='absolute top-12 bottom-0 right-0 left-0 p-2 pb-12 text-black'>
                <CustDatePicker dateRange={packagesData.dateRange} setDateRange={packagesData.setDateRange} />
                <NavPage />
                <div className='mt-12' id='map-section'>
                    Map
                </div>
                <div className='bg-slate-300 w-5/6 h-0.5 -mb-8' style={{ borderRadius: '0 50% 50% 0' }}></div>
                <div className='w-full flex justify-between mt-24'>
                    <KeyModal data={packagesData.stateData} setSelectedState={setSelectedState} selectedState={selectedState} />
                    <Map data={packagesData.stateData} setSelectedState={setSelectedState} selectedState={selectedState} />
                </div>
                <div className='mt-12' id='shipping-section'>
                    Shipping
                </div>
                <div className='bg-slate-300 w-5/6 h-0.5 -mb-8' style={{ borderRadius: '0 50% 50% 0' }}></div>
                <Top10Chart />
            </div>
        )
    }
}