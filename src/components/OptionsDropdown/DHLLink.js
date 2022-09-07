import { Link } from "react-router-dom"

export default function DHLLink(){
    return(
        <Link to='/kpis/dhl_shipping'>
            <div className='flex items-center justify-between w-full text-xl p-2 border-y border-slate-700 cursor-pointer'>
                <p className='text-white'>DHL Shipping</p>
            </div>
        </Link>
    )
}