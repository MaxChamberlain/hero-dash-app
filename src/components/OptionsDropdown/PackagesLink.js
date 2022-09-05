import { Link } from "react-router-dom"

export default function Logout(){
    return(
        <Link to='/kpis/packages_shipping'>
            <div className='flex items-center justify-between w-full text-xl p-2 border-y border-slate-700 cursor-pointer'>
                <p className='text-white'>Packages and Shipping</p>
            </div>
        </Link>
    )
}