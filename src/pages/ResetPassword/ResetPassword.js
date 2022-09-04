import { useState } from 'react';
const { sentResetEmail } = require('./utils/sentResetEmail');
const logo = require('../../assets/images/logo.png');

export default function ResetPassword(){
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    return(
        sent ?
        <div className='bg-stone-200 p-5 text-black'>
            <div className='flex justify-center align-center mb-10'>
                <div className='mr-5 h-full'>
                    ViDash
                </div>
                <img src={logo} alt='logo' className='w-10' />
            </div>
            <div className='text-center'>
                Sent!
            </div>
        </div>
        :
        <div className='bg-stone-200 p-5 text-black'>
            <div className='flex justify-center align-center mb-10'>
                <div className='mr-5 h-full'>
                    ViDash
                </div>
                <img src={logo} alt='logo' className='w-10' />
            </div>
            <form className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <label className='text-left w-full' htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                    <div className='w-full bg-stone-300 p-5 mt-5 cursor-pointer rounded text-center'
                        onClick={() => {
                            setSent(true);
                            sentResetEmail(email);
                        }}
                    >Reset Password</div>
                </div>
            </form>
        </div>
    )
}