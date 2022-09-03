import { getUsers } from "./utils/getUsers"
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import General from './components/General';
import Users from './components/Users';
import CompanySettings from './components/CompanySettings';

export default function Settings(){
    const [page, setPage] = useState('general')
    const [users, setUsers] = useState([])

    let canManage = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canManage;
    const isAdmin = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin;
    if(isAdmin){
        canManage = true
    }

    useEffect(() => {
        const refreshUsers = async () => {
            console.log('refreshing users')
            const returnedUsers = await getUsers()
            setUsers(returnedUsers)
            console.log(users)
        }
        refreshUsers()
    }, [])

    return (
        <motion.div 
            className='text-slate-50 w-screen p-5 h-screen py-20 text-black'
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
        >
            <h1>Settings</h1>
            <div className='flex justify-around w-full md:flex-row flex-col'>
                <div className='bg-slate-50 md:w-80 md:mb-0 mb-5 rounded p-2 flex flex-col h-fit'>
                    <div className={`text-slate-900 font-bold p-2 rounded text-lg cursor-pointer ${page === 'general' ? 'bg-slate-200' : ''}`} onClick={() => setPage('general')}>General</div>
                    {canManage && <div className={`text-slate-900 font-bold p-2 rounded text-lg cursor-pointer ${page === 'users' ? 'bg-slate-200' : ''}`} onClick={() => setPage('users')}>Users</div>}
                    {isAdmin && <div className={`text-slate-900 font-bold p-2 rounded text-lg cursor-pointer ${page === 'Company Settings' ? 'bg-slate-200' : ''}`} onClick={() => setPage('Company Settings')}>Company Settings</div>}
                </div>
                <div className='bg-slate-50 w-full md:ml-5 rounded p-2 flex flex-col md:text-xs'>
                    {page === 'general' && <General />}
                    {page === 'users' && (canManage) && <Users users={users} />}
                    {page === 'Company Settings' && isAdmin && <CompanySettings />}
                </div>
            </div>
        </motion.div>
    )
}