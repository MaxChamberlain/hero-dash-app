import { useState } from 'react';
const {reset} = require('./utils/reset');
const logo = require('../../assets/images/logo.png');

export default function ResetPassword(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');

    return(
        <div className='bg-stone-200 p-5 text-black'>
            <div className='flex justify-center align-center mb-10'>
                <div className='mr-5 h-full'>
                    ViDash
                </div>
                <img src={logo} alt='logo' className='w-10' />
            </div>
            <form className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <label className='text-left w-full' htmlFor="oldpass">Old Password</label>
                    <input type="oldpass" name="oldpass" id="oldpass" placeholder='Old Password' onChange={(e) => setOldPass(e.target.value)} />
                    <label className='text-left w-full mt-8' htmlFor="email">New Password</label>
                    <input type="newpass" name="newpass" id="newpass" placeholder='New Password' onChange={(e) => setNewPass(e.target.value)} />
                    <div className='w-full bg-stone-300 p-5 mt-5 cursor-pointer rounded text-center'
                    onClick={() => oldPass && newPass && reset(oldPass, newPass, id)}
                    >Reset Password</div>
                </div>
            </form>
        </div>
    )
}