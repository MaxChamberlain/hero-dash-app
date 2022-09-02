import PickerPerformanceChart from "../charts/PickerPerformanceChart";

export default function PickerPerformanceModal({ dateRange, setDateRange }) {
    return(
        <>
        <div className='mt-12 text-black text-xl bg-stone-300 p-1'>Picking and Packing</div>
        <div className='w-full bg-stone-200 rounded h-72 text-sm p-4 mb-4'>
            <PickerPerformanceChart dateRange={dateRange} />
        </div>
        </>
    )
}