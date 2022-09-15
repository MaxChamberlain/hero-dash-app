import TotalReturnsChart from "./TotalReturnsChart"

export default function TotalReturnsModal() {
    return(
        <>
        <div className='mt-12 text-black text-lg bg-stone-300 p-2'>Return Totals</div>
        <div className='w-full bg-stone-200 rounded h-72 text-sm p-4 mb-4 flex'>
            <TotalReturnsChart />
        </div>
        </>
    )
}