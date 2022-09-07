import { useContext } from "react";
import { CompanyContext } from "../../contexts/CompanyContext";
import { PickDatacontext } from "../../contexts/DataContext";
import Loading from "../../components/Loading";

export default function DHLShipping() {
    const { company } = useContext(CompanyContext);
    const { packagesData } = useContext(PickDatacontext);

    if (packagesData.loading || !company) {
        return <Loading />;
    } else if (packagesData.error) {
        return <div className="text-red">Error</div>;
    } else {
        if (company.uses_dhl) {
            return (
            <>
                <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl text-white">DHL Shipping</h1>
                </div>
            </>
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