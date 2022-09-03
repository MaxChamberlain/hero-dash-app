import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { getUser } = require('./utils/getUser');

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
        <div className='bg-slate-50 w-fit md:p-5 md:ml-5 rounded p-2 flex flex-col md:text-xs'>
            <div className='text-slate-900 w-full'>
                <h1>General</h1>
                <div className='flex flex-col w-full'>
                    <div className='md:text-2xl text-lg'>
                        {user.first_name}
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
                    <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                        <p className='text-base'>Admin</p>
                        <p className='text-base md:ml-12'>{user.isAdmin ? 'Yes' : 'No'}</p>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                        <p className='text-base'>Manager</p>
                        <p className='text-base md:ml-12'>{user.canManage ? 'Yes' : 'No'}</p>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between w-full mb-5'>
                        <p className='text-base'>Dark Mode</p>
                        <p className='text-base md:ml-12'>{user.theme_preference === 'dark' ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}