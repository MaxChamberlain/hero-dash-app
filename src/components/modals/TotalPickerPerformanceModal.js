import TotalPickerPerformanceModal from "../charts/TotalPickerPerformanceChart";

export default function PickerPerformanceModal({ dateRange, setDateRange }) {
    return(
        <>
        <div className='mt-12 text-black text-xl bg-stone-300 p-1'>Overall per Person</div>
        <div className='w-full bg-stone-200 rounded h-72 text-sm p-4 mb-4'>
            <TotalPickerPerformanceModal dateRange={dateRange} />
        </div>
        </>
    )
}