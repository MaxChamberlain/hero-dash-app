export default function General(){
    return (
        <div className='text-slate-900'>
            <h1>General</h1>
            <div className='flex flex-col'>
                <div className='md:text-2xl text-lg'>
                    You
                </div>
                <div className='bg-slate-200 w-1/2 h-0.5 mb-4' style={{ borderRadius: '0 50% 50% 0' }}>

                </div>
                <div className='flex flex-col justify-between w-1/2 mb-5'>
                    <p className='text-base'>Full Name</p>
                    <p className='text-base'>{JSON.parse(localStorage.getItem('@ViDash:_userInfo')).first_name + ' ' + JSON.parse(localStorage.getItem('@ViDash:_userInfo')).last_name}</p>
                </div>
                <div className='flex flex-col justify-between w-1/2 mb-5'>
                    <p className='text-base'>Email Address</p>
                    <p className='text-base'>{JSON.parse(localStorage.getItem('@ViDash:_userInfo')).email_address}</p>
                </div>
                <div className='flex flex-col justify-between w-1/2 mb-5'>
                    <p className='text-base'>Admin</p>
                    <p className='text-base'>{JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin ? 'Yes' : 'No'}</p>
                </div>
                <div className='flex flex-col justify-between w-1/2 mb-5'>
                    <p className='text-base'>Manager</p>
                    <p className='text-base'>{JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canManage ? 'Yes' : 'No'}</p>
                </div>
                <div className='flex flex-col justify-between w-1/2 mb-5'>
                    <p className='text-base'>Dark Mode</p>
                    <p className='text-base'>{JSON.parse(localStorage.getItem('@ViDash:_userInfo')).theme_preference === 'dark' ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </div>
    )
}