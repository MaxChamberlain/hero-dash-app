import PickerPackerLink from './OptionsDropdown/PickerPackerLink';
import PackagesLink from './OptionsDropdown/PackagesLink';
import DHLLink from './OptionsDropdown/DHLLink';
import USAMapLink from './OptionsDropdown/USAMapLink';
import { useContext } from 'react';
const { CompanyContext } = require('../contexts/CompanyContext');

export default function KPIPages({ setNavbarOpen }){
    const {company} = useContext(CompanyContext)

    return (
        <div className="w-full text-white shadow-full" style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
        }} onClick={() => setNavbarOpen(false)}>
            <PickerPackerLink />
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || (JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canDrillDown && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts)) && <PackagesLink />}
            {company.uses_dhl && (JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || (JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canDrillDown && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts)) && <DHLLink />}
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || (JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canDrillDown && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts)) && <USAMapLink />}
        </div>
    )
}