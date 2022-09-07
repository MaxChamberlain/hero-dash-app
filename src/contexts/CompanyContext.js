import { useState, useEffect, createContext } from 'react';
const { getCompany } = require('../utils/functions/companyHandler/getCompany');

export const CompanyContext = createContext()

export default function PicksDataContext({ children }){
    const [company, setCompany] = useState({});

    useEffect(() => {
        const refreshData = async () => {
            const data = await getCompany();
            setCompany(data)
        }
        refreshData()
    }, [])
    return(
        <>
            <CompanyContext.Provider value={company}>
                {children}
            </CompanyContext.Provider>
        </>
    )

}