import { useState, useEffect, createContext } from 'react';
import { getData } from "../utils/functions/temp_get_db_data"
import { getData as getPersonData } from "../utils/functions/temp_get_db_person_data"
import { getData as getPackageDataConsolidated } from "../utils/functions/temp_get_db_package_data_consolidated"
import { getData as getTotals } from "../utils/functions/getTotals"
import { getData as getCarrierData} from "../utils/functions/temp_get_db_carrier_data"
import { getData as getMethodData } from "../utils/functions/temp_get_db_method_data"
import { getData as getStateData } from "../utils/functions/temp_get_db_state_data"
import { getData as getLoopReturnsData } from "../utils/functions/temp_get_db_loop_returns_data"

export const PickDatacontext = createContext()

export default function PicksDataContext({ children }){
    const [dateRange, setDateRange] = useState({startDate: new Date(), endDate: new Date()});
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pickData, setPickData] = useState([]);
    const [packData, setPackData] = useState([]);
    const [pickerPersonData, setPickerPersonData] = useState([]);
    const [packagesData, setPackagesData] = useState([]);
    const [packagesDataConsolidated, setPackagesDataConsolidated] = useState([]);
    const [totalsData, setTotalsData] = useState([]);
    const [carrierData, setCarrierData] = useState([]);
    const [methodData, setMethodData] = useState([]);
    const [dhlZoneData, setDhlZoneData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [loopReturnsData, setLoopReturnsData] = useState([]);

    const refreshData = async () => {
        getData(dateRange.startDate, dateRange.endDate, setLoading, setError).then(data => {
            setPickData(data.sort((a, b) => (a.items_picked < b.items_picked) ? 1 : -1))
            setPackData(data.sort((a, b) => (a.items_packed < b.items_packed) ? 1 : -1))
        })

        getPersonData(dateRange.startDate, dateRange.endDate, setLoading, setError).then(data => {
            setPickerPersonData(data)
        })

        getPackageDataConsolidated(dateRange, setLoading, setError).then(data => {
            setPackagesDataConsolidated(data)
        })

        getTotals(dateRange, setLoading, setError).then(data => {
            setTotalsData(data)
        })

        getCarrierData(dateRange, setLoading, setError).then(data => {
            setCarrierData(data)
        })

        getStateData(dateRange, setLoading, setError).then(data => {
            setStateData(data)
        })

        getLoopReturnsData(dateRange, setLoading, setError).then(data => {
            setLoopReturnsData(data)
        })

        getMethodData(dateRange, setLoading, setError).then(data => {
            setMethodData(data)
        })

        if(localStorage.getItem('@ViDash:_userInfo')){
            require("../utils/functions/getDhlZone").getDHLZone(dateRange, setLoading, setError).then(data => {
                setDhlZoneData(data)
            })  
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const startDate = urlParams.get('startDate');
        const endDate = urlParams.get('endDate');
        if(startDate && endDate){
            setDateRange({startDate: new Date(startDate), endDate: new Date(endDate)})
        }
    }, [])

    useEffect(() => {
        if(localStorage.getItem('@ViDash:_userInfo')){
            refreshData()
        }
        if(dateRange.startDate > dateRange.endDate){
            dateRange.endDate = dateRange.startDate
        }
        
    }, [dateRange])

    useEffect(() => {
        let interval
        if(autoRefresh){
            interval = setInterval(() => {
                refreshData()
            }, 5000)
        }else{
            clearInterval(interval)
        }
    }, [autoRefresh])

    useEffect(() => {
        if(error){
            setLoading(false)
        }
    }, [error])

    return(
        <>
            <PickDatacontext.Provider value={{
                pickData, setPickData, 
                packData, setPackData,
                pickerPersonData, setPickerPersonData,
                packagesData, setPackagesData,
                totalsData, setTotalsData,
                carrierData, setCarrierData,
                methodData, setMethodData,
                dhlZoneData, setDhlZoneData,
                stateData, setStateData,
                packagesDataConsolidated, setPackagesDataConsolidated,
                loopReturnsData, setLoopReturnsData,
                dateRange, setDateRange, 
                autoRefresh, setAutoRefresh,
                loading, setLoading, 
                error, setError
                }}>
                {children}
            </PickDatacontext.Provider>
        </>
    )

}