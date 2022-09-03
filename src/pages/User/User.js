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
        <div className='text-slate-900 text-left justify-start'>
            <h1 className='bg-slate-300 p-2'>{user.first_name} {user.last_name}</h1>
            <div className='flex w-full flex-col bg-slate-200 p-4 rounded'>
                <div className='flex justify-between'>
                    <p className='text-xl'>Email Address</p>
                    <p className='text-xl ml-16'>{user.email_address}</p>
                </div>
            </div>
            <div className='flex w-full flex-col bg-slate-200 p-4 rounded'>
                <div className='flex justify-between'>
                    <p className='text-xl'>Admin</p>
                    <p className='text-xl ml-16'>{user.isAdmin ? 'Yes' : 'No'}</p>
                </div>
            </div>
            <div className='flex w-full flex-col bg-slate-200 p-4 rounded'>
                <div className='flex justify-between'>
                    <p className='text-xl'>Manager</p>
                    <p className='text-xl ml-16'>{user.canManage ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </div>
    )
}