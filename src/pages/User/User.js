import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const { getUser } = require('./utils/getUser');
const arrow = require('../../assets/images/arrow.png');
const {changeAdminPerms, changeManagerPerms, changeExportPerms, changeViewDollarPerms, changeDrillDownPerms, deleteUser} = require('./utils/updateUser');

export default function User(){
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const refreshUser = async () => {
            const user = await getUser(id);
            setUser(user);
        }
        refreshUser();
    }, [id])

    return (
        <>
            <Link to='/settings?tab=users'>
                <motion.div
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    exit={{ x: -100 }}
                    style={{ backgroundColor: '#fff', borderRadius: '50%', position: 'fixed', top: 80, left: 20, cursor: 'pointer' }}
                    className='shadow-md'
                >
                <img src={arrow} alt="logo" className="w-12 rotate-90" />
                </motion.div>
            </Link>
            <div className='flex md:flex-row flex-col justify-center w-screen p-5 md:mt-0 mt-40'>
                <div className='bg-slate-50 md:w-fit md:p-5 md:ml-5 rounded p-2 flex flex-col md:text-xs'>
                    <div className='text-slate-900 w-full'>
                        <div className='flex flex-col'>
                            <div className='md:text-2xl text-lg'>
                                User Info
                            </div>
                            <div className='bg-slate-200 w-1/2 h-0.5 mb-4' style={{ borderRadius: '0 50% 50% 0' }}>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                                <p className='text-base'>Full Name</p>
                                <p className='text-base md:ml-12'>{user.first_name + ' ' + user.last_name}</p>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                                <p className='text-base'>Email Address</p>
                                <p className='text-base md:ml-12'>{user.email_address}</p>
                            </div>
                            <div className='md:text-2xl text-lg mt-5'>
                                Permissions
                            </div>
                            <div className='bg-slate-200 w-1/2 h-0.5 mb-4' style={{ borderRadius: '0 50% 50% 0' }}>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                                <p className='text-base'>Admin</p>
                                <p className='text-base md:ml-12'>{user.isAdmin ? 'Yes' : 'No'}</p>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                                <p className='text-base'>Manager</p>
                                <p className='text-base md:ml-12'>{user.canManage || user.isAdmin ? 'Yes' : 'No'}</p>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                                <p className='text-base'>Can See Dollar Amounts</p>
                                <p className='text-base md:ml-12'>{user.canSeeDollarAmounts || user.isAdmin ? 'Yes' : 'No'}</p>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                                <p className='text-base'>Can Export Data</p>
                                <p className='text-base md:ml-12'>{user.canExportData || user.isAdmin ? 'Yes' : 'No'}</p>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                                <p className='text-base'>Can Drill Down</p>
                                <p className='text-base md:ml-12'>{user.canDrillDown || user.isAdmin ? 'Yes' : 'No'}</p>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                                <p className='text-base'>Dark Mode</p>
                                <p className='text-base md:ml-12'>{user.theme_preference === 'dark' ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:mt-0 mt-5 bg-slate-50 md:w-fit md:p-5 md:ml-5 rounded p-2 flex flex-col md:text-xs'>
                    <div className='text-slate-900 w-full'>
                        <div className='flex flex-col w-full'>
                            <div className='md:text-2xl text-lg'>
                                Actions
                            </div>
                            <div className='bg-slate-200 w-full h-0.5 mb-4' style={{ borderRadius: '0 50% 50% 0' }}>
                            </div>
                            <div className='flex flex-col justify-between w-full mb-5'>
                                {JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin && 
                                    (user.isAdmin ?
                                        <div className='text-base bg-slate-200 rounded p-2 cursor-pointer mb-2' onClick={() => changeAdminPerms(user._id, false)}>Remove Admin</div>:
                                        <div className='text-base bg-slate-200 rounded p-2 cursor-pointer mb-2' onClick={() => changeAdminPerms(user._id, true)}>Make Admin</div>)
                                }
                                { user.canManage ? 
                                    <div className='text-base bg-slate-200 rounded p-2 cursor-pointer mb-2' onClick={() => changeManagerPerms(user._id, false)}>Remove Manager</div> :
                                    <div className='text-base bg-slate-200 rounded p-2 cursor-pointer mb-2' onClick={() => changeManagerPerms(user._id, true)}>Make Manager</div>
                                }
                                { user.isAdmin || (user.canSeeDollarAmounts ?
                                    <div className='text-base bg-slate-200 rounded p-2 cursor-pointer mb-2' onClick={() => changeViewDollarPerms(user._id, false)}>Deny Dollar Amounts</div> :
                                    <div className='text-base bg-slate-200 rounded p-2 cursor-pointer mb-2' onClick={() => changeViewDollarPerms(user._id, true)}>Allow Dollar Amounts</div>)
                                }
                                { user.isAdmin || (user.canExportData ?
                                    <div className='text-base bg-slate-200 rounded p-2 cursor-pointer mb-2' onClick={() => changeExportPerms(user._id, false)}>Deny Export Data</div> :
                                    <div className='text-base bg-slate-200 rounded p-2 cursor-pointer mb-2' onClick={() => changeExportPerms(user._id, true)}>Allow Export Data</div>)
                                }
                                { user.isAdmin || (user.canDrillDown ?
                                    <div className='text-base bg-slate-200 rounded p-2 cursor-pointer mb-2' onClick={() => changeDrillDownPerms(user._id, false)}>Deny Drill Down</div> :
                                    <div className='text-base bg-slate-200 rounded p-2 cursor-pointer mb-2' onClick={() => changeDrillDownPerms(user._id, true)}>Allow Drill Down</div>)
                                }
                                {JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin && <div className='text-base bg-red-400 rounded p-2 cursor-pointer mb-2 mt-8' onClick={() => deleteUser(user._id)}>Delete User</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}