import PickerPerformanceModal from "../../components/modals/PickerPerformanceModal";
import PicksPerformanceModal from "../../components/modals/PicksPerformanceModal";
import PacksPerformanceModal from "../../components/modals/PacksPerformanceModal";
import TotalPickerPerformanceModal from "../../components/modals/TotalPickerPerformanceModal";
import CustDatePicker from "../../components/CustDatePicker";
import BestPicker from "./components/BestPicker";
import BestPacker from "./components/BestPacker";
import Speedometer from "./components/Speedometer";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
const { PickDatacontext } = require('../../contexts/DataContext');
const downloadIcon = require ('../../assets/images/download_icon.png');
const { getData } = require('../../utils/functions/csv/PickPack');

export default function HomePage(){
    const [downloadable, setDownloadable] = useState(false)
    
    const {dateRange, setDateRange} = useContext(PickDatacontext)

    return (
        <motion.div 
            className='text-slate-50 w-screen p-5 h-screen py-20 text-black mb-12'
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
        >
            <CustDatePicker dateRange={dateRange} setDateRange={setDateRange} />
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canExportData) && (downloadable ? downloadable : <img src={downloadIcon} alt="download icon" className="absolute top-10 right-0 m-5 w-6 h-6 cursor-pointer" onClick={() => getData(dateRange, setDownloadable)} />)}
            <div className="w-full flex justify-around">
                <div className="w-full">
                    <PickerPerformanceModal dateRange={dateRange} setDateRange={setDateRange} />
                </div>
                <div className="w-1/3 mt-12">
                    <Speedometer dateRange={dateRange} setDateRange={setDateRange} />
                </div>
            </div>
            <TotalPickerPerformanceModal dateRange={dateRange} setDateRange={setDateRange} />
            <div className="flex flex-col md:flex-row justify-around align-start w-full">
                <div className='w-full md:mr-2'>
                    <PicksPerformanceModal dateRange={dateRange} setDateRange={setDateRange} />
                </div>
                <div className='w-full md:ml-2 md:mt-12'>
                    <BestPicker dateRange={dateRange} setDateRange={setDateRange} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-around align-start w-full">
                <div className='w-full md:mr-2'>
                    <BestPacker dateRange={dateRange} setDateRange={setDateRange} />
                </div>
                <div className='w-full md:ml-2'>
                    <PacksPerformanceModal dateRange={dateRange} setDateRange={setDateRange} />
                </div>
            </div>
        </motion.div>
    )
}