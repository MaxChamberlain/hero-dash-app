import PackagesWithPriceChart from "../charts/PackagesWithPriceChart";

export default function PickerPerformanceModal({ dateRange, setDateRange }) {
    return(
        <>
        <div className='mt-12 text-black text-lg bg-stone-300 p-2'>Package Totals and Averages</div>
        <div className='w-full bg-stone-200 rounded h-72 text-sm p-4 mb-4 flex'>
            <PackagesWithPriceChart dateRange={dateRange} />
        </div>
        </>
    )
}