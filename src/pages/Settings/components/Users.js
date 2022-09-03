import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { sendInvite } from '../utils/sendInvite'

export default function Users({users}){
    const [inviting, setInviting] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <div className='text-slate-900'>
            <div className='flex justify-between'>
                <h1>Users</h1>
                <div className='flex items-center text-sm mg-2 mr-4 py-2 px-4 bg-gray-300 rounded hover:bg-slate-300 cursor-pointer' onClick={() => {
                    setInviting(true)
                }}>
                    Invite
                </div>
            </div>
            <div className='flex flex-col'>
                {users && users.length > 0 && users.map(user => (
                    <div className='flex justify-between items-center p-2 border-b border-slate-200 bg-slate-200 my-4 rounded'>
                        <div className='flex items-start md:items-center text-xl md:flex-row flex-col'>
                            <p className='ml-2'>{user.first_name} {user.last_name}</p>
                            <p className='ml-2 text-xs text-slate-600'>{user.email_address}</p>
                        </div>
                        <Link to={`/user/${user._id}`}>
                            <div className='flex items-end text-sm mg-2 mr-4 py-2 px-4 bg-gray-300 rounded hover:bg-slate-300 cursor-pointer'>
                                View
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {inviting && (
                <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center' style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <div className='bg-slate-200 p-4 rounded'>
                        <div className='top-0 right-0 text-lg text-black cursor-pointer' onClick={() => {
                            setEmail('')
                            setInviting(false)
                        }}>
                            x
                        </div>
                        <h1 className='mb-10'>Invite a user</h1>
                        <div className='flex flex-col p-5'>
                            <label htmlFor='first_name' className='text-lg'>EMAIL</label>
                            <input type='text' name='first_name' id='first_name' placeholder='Email' className='text-lg' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>  
                        <button className='p-2 bg-slate-300 rounded w-full text-lg' onClick={() => {
                            sendInvite(email)
                            setEmail('')
                            setInviting(false)
                        }}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
