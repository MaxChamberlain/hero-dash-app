import { useContext, useState, useEffect } from 'react';
import Loading from '../../Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function PriceAverages ({ dateRange, setDateRange, setShowTable }) {
    const [methodData, setMethodData] = useState([]);
    const PickDataContext = useContext(PickDatacontext)

    useEffect(() => {
        const methods = [...new Set(PickDataContext.methodData.map(method => method.method))]
        let newData = []
        methods.forEach(method => {
            let temp = PickDataContext.methodData.filter(methodData => methodData.method === method)
            if(method){
                let tempObj = {
                    method: method,
                    total_packages: temp.reduce((acc, curr) => acc + curr.orders_sent, 0),
                    total_in_price: temp.reduce((acc, curr) => acc + curr.total_in_price, 0),
                    total_out_cost: temp.reduce((acc, curr) => acc + curr.total_out_cost, 0),
                    avg_in_price: temp.reduce((acc, curr) => acc + curr.avg_in_price, 0) / temp.length,
                    avg_out_cost: temp.reduce((acc, curr) => acc + curr.avg_out_cost, 0) / temp.length,
                }
                newData.push(tempObj)
            }
        })
        setMethodData(newData)
    }, [PickDataContext.methodData])
    
        if(PickDataContext.loading){
            return <Loading />
        }else if(PickDataContext.error){
            return(
                <div className='text-red'>
                    Error
                </div>
            )
        }else{
        return(
            <div className='w-screen h-screen fixed top-0 left-0 z-[9998] flex justify-center items-center text-white' style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <div className='p-4 w-11/12 bg-slate-800 rounded'>
                    <div className='flex justify-center items-center relative'>
                        <div className='text-2xl font-bold mb-8'>Method Data</div>
                        <div className='absolute right-4 top-0 cursor-pointer text-2xl' onClick={() => setShowTable(false)}>x</div>
                    </div>
                    {methodData.length > 0 && <table className='table-auto w-full text-lg'>
                        <tbody>
                            <tr className='font-bold'>
                                <td> </td>
                                {Object.keys(methodData[0]).map((key, index) => {
                                    return <td key={index}>{key.split('_').join(' ')}</td>
                                })}
                            </tr>
                            {methodData.map((method, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {Object.values(method).map((value, index) => {
                                            return <td key={index}>{value}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        )
    }
}