import { useContext, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CustDatePicker from '../../components/CustDatePicker'
import TotalReturnsModal from './components/TotalReturnsModal'
import Totals from './components/Totals'
const { CompanyContext } = require('../../contexts/CompanyContext')
const { PickDatacontext } = require('../../contexts/DataContext')

export default function LoopReturns(){
    const { company } = useContext(CompanyContext)
    const { dateRange, setDateRange } = useContext(PickDatacontext)

    return(
        <motion.div 
            className='text-slate-50 w-screen p-5 h-screen py-20 text-black mb-12'
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
        >
            <CustDatePicker dateRange={dateRange} setDateRange={setDateRange} />
            <Totals />
            <TotalReturnsModal />
        </motion.div>
    )
}