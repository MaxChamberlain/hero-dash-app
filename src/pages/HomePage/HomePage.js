import PickerPerformanceModal from "../../components/modals/PickerPerformanceModal";
import PicksPerformanceModal from "../../components/modals/PicksPerformanceModal";
import PacksPerformanceModal from "../../components/modals/PacksPerformanceModal";
import PackagesWithPriceModal from "../../components/modals/PackagesWithPriceModal";
import Totals from "../../components/modals/Totals";
import CustDatePicker from "../../components/CustDatePicker";
import { useContext } from "react";
import { motion } from "framer-motion";
const { PickDatacontext } = require('../../contexts/DataContext');

export default function HomePage(){
    const PickDataContext = useContext(PickDatacontext)

    return (
        <motion.div 
            className='text-slate-50 w-screen p-5 h-screen py-20 text-black'
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
        >
            <CustDatePicker dateRange={PickDataContext.dateRange} setDateRange={PickDataContext.setDateRange} />
            <PickerPerformanceModal dateRange={PickDataContext.dateRange} setDateRange={PickDataContext.setDateRange} />
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts) && <Totals dateRange={PickDataContext.dateRange} setDateRange={PickDataContext.setDateRange} />}
            <div className="flex flex-col md:flex-row justify-around align-start w-full">
                <div className='w-full md:mr-2'>
                    <PicksPerformanceModal dateRange={PickDataContext.dateRange} setDateRange={PickDataContext.setDateRange} />
                </div>
                <div className='w-full md:ml-2'>
                    <PacksPerformanceModal dateRange={PickDataContext.dateRange} setDateRange={PickDataContext.setDateRange} />
                </div>
            </div>
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts) && <PackagesWithPriceModal dateRange={PickDataContext.dateRange} setDateRange={PickDataContext.setDateRange} />}
        </motion.div>
    )
}