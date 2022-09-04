import { Link } from "react-router-dom"

export default function Logout(){
    return(
        <Link to='/kpis/picking_and_packing'>
            <div className='flex items-center justify-between w-full text-xl rounded cursor-pointer mb-2'>
                <p className='text-white'>Picking and Packing</p>
            </div>
        </Link>
    )
}