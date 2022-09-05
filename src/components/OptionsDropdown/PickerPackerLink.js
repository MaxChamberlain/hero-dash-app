import { Link } from "react-router-dom"

export default function Logout(){
    return(
        <Link to='/kpis/picking_and_packing'>
            <div className='flex items-center justify-between w-full text-xl cursor-pointer border-y p-2 border-slate-700'>
                <p className='text-white'>Picking and Packing</p>
            </div>
        </Link>
    )
}