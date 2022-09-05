import CustDatePicker from "../../components/CustDatePicker";
import PackagesWithPriceModal from "../../components/modals/PackagesWithPriceModal";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Totals from "../../components/modals/Totals";

export default function Packages(){
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    return (
        <motion.div 
            className='text-slate-50 w-screen p-5 h-screen py-20 text-black mb-12'
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
        >
            <CustDatePicker dateRange={dateRange} setDateRange={setDateRange} />
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts) && <Totals dateRange={dateRange} setDateRange={setDateRange} />}
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts) && <PackagesWithPriceModal dateRange={dateRange} setDateRange={setDateRange} />}
        </motion.div>
    )
}