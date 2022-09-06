import CustDatePicker from "../../components/CustDatePicker";
import PackagesWithPriceModal from "../../components/modals/PackagesWithPriceModal";
import PackagesByCarrierModal from "../../components/modals/PackagesByCarrierModal";
import PackagesByShipMethodModal from "../../components/modals/PackagesByShipMethodModal";
import NavPage from "./components/NavPage";

import { getCompany } from "../../utils/functions/companyHandler/getCompany";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Totals from "../../components/modals/Totals";

export default function Packages(){
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date()
    });
    const [company, setCompany] = useState({});

    useEffect(() => {
        const init = async() => {
            const company = await getCompany();
            setCompany(company);
        }
        init()
    }, [])

    return (
        <motion.div 
            className='text-slate-50 w-screen p-5 h-screen py-20 text-black mb-12'
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
        >
            <div className='flex justify-between align-start w-full'>
                <CustDatePicker dateRange={dateRange} setDateRange={setDateRange} />
                <NavPage />
            </div>
            <div className='mt-12' id='general-section'>
                General
            </div>
            <div className='bg-slate-300 w-5/6 h-0.5 -mb-8' style={{ borderRadius: '0 50% 50% 0' }}>
            </div>
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts) && <Totals dateRange={dateRange} setDateRange={setDateRange} />}
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts) && <PackagesWithPriceModal dateRange={dateRange} setDateRange={setDateRange} />}


            <div className='mt-12' id='carrier-section'>
                By Carrier
            </div>
            <div className='bg-slate-300 w-5/6 h-0.5' style={{ borderRadius: '0 50% 50% 0' }}>
            </div>
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts) && <PackagesByCarrierModal dateRange={dateRange} setDateRange={setDateRange} />}


            <div className='mt-12' id='method-section'>
                By Ship Method
            </div>
            <div className='bg-slate-300 w-5/6 h-0.5' style={{ borderRadius: '0 50% 50% 0' }}>
            </div>
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts) && <PackagesByShipMethodModal dateRange={dateRange} setDateRange={setDateRange} />}

            {company.uses_dhl && <>
                
            </>}

        </motion.div>
    )
}