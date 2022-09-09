import { Link } from "react-router-dom"

export default function DHLLink(){
    return(
        <Link to='/kpis/country_map'>
            <div className='flex items-center justify-between w-full text-xl p-2 border-y border-slate-700 cursor-pointer'>
                <p className='text-white'>USA Map</p>
            </div>
        </Link>
    )
}