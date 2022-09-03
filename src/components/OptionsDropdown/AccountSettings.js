import { Link } from "react-router-dom"

export default function Logout(){
    return(
        <Link to='/settings'>
            <div className='flex items-center justify-center w-full border-slate-500 border-2 py-3 px-5 text-xl rounded cursor-pointer mb-2'>
                <p className='text-white'>Account Settings</p>
            </div>
        </Link>
    )
}