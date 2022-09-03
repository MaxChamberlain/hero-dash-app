import Logout from './OptionsDropdown/Logout';
import AccountSettings from './OptionsDropdown/AccountSettings';
import { motion } from 'framer-motion';

export default function OptionsDropdown(){
    return(
        <motion.div 
            className='p-3 rounded-bl-lg bg-slate-900 fixed top-12 right-0'
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ duration: 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
        >
            {JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canManage && <AccountSettings />}
            <Logout />
        </motion.div>
    )
}