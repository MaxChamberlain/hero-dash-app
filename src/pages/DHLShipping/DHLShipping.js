import { useState, useContext } from "react";
import { CompanyContext } from "../../contexts/CompanyContext";
import { PickDatacontext } from "../../contexts/DataContext";
import Loading from "../../components/Loading";
import CustDatePicker from "../../components/CustDatePicker";
import { KeyModal } from "./components/KeyModal";
import { Map } from "./components/Map";
import { motion } from "framer-motion";
import PackagesByDHLZoneModal from "../../components/modals/PackagesByDHLZoneModal";

export default function DHLShipping() {
    const [selectedState, setSelectedState] = useState("");
    const { company } = useContext(CompanyContext);
    const packagesData = useContext(PickDatacontext);

    if (packagesData.loading || !company) {
        return <Loading />;
    } else if (packagesData.error) {
        return <div className="text-red">Error</div>;
    } else {
        if (company.uses_dhl) {
            return (
                <motion.div 
                    className='text-slate-50 w-screen p-5 h-screen py-20 text-black'
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -80, opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0 }}
                >
                    <CustDatePicker dateRange={packagesData.dateRange} setDateRange={packagesData.setDateRange} />
                    <div className='w-full flex justify-between mt-24'>
                        <KeyModal data={packagesData.stateData} setSelectedState={setSelectedState} selectedState={selectedState} zoneData={packagesData.dhlZoneData} />
                        <Map data={packagesData.stateData} setSelectedState={setSelectedState} selectedState={selectedState} />
                    </div>
                    <PackagesByDHLZoneModal dateRange={packagesData.dateRange} setDateRange={packagesData.setDateRange} />
                </motion.div>
            );
        } else {
            return (
            <>
                <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl text-white">DHL Shipping</h1>
                <p className="text-white">This company does not use DHL</p>
                </div>
            </>
            );
        }
    }
}