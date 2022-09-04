import Logout from './OptionsDropdown/Logout';
import AccountSettings from './OptionsDropdown/AccountSettings';
import KPIPages from "./KPIPages";
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function OptionsDropdown(){
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return(
        <motion.div 
            className='p-3 rounded-bl-lg bg-slate-900 fixed top-12 right-0 h-full'
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ duration: 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
        >
            <div className='flex items-center justify-between flex-col w-full border-slate-500 border-2 text-xl rounded cursor-pointer mb-2'>
                <div className='flex justify-between items-center w-full p-3' onClick={() => setDropdownOpen(was => !was)}>
                    <p className='text-white'>KPIs</p>
                    <svg className='w-6 h-6 text-white' viewBox="0 0 20 20" fill="currentColor">
                        {dropdownOpen ? 
                            <path fillRule="evenodd" d="M15.707 12.707a1 1 0 01-1.414 0L10 8.414 5.707 12.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 010 1.414z" clipRule="evenodd" />:
                            <path fillRule="evenodd" d="M4.293 7.293a1 1 0 011.414 0L10 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" clipRule="evenodd" />
                        }
                    </svg>
                </div>
                {dropdownOpen && <KPIPages />}
            </div>
            {JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canManage && <AccountSettings />}
            <Logout />
        </motion.div>
    )
}