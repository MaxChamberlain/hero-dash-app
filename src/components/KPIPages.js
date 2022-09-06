import PickerPackerLink from './OptionsDropdown/PickerPackerLink';
import PackagesLink from './OptionsDropdown/PackagesLink';

export default function KPIPages({ setNavbarOpen }){
    return (
        <div className="w-full text-white shadow-full" style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
        }} onClick={() => setNavbarOpen(false)}>
            <PickerPackerLink />
            {(JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin || (JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canDrillDown && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canSeeDollarAmounts))&& <PackagesLink />}
        </div>
    )
}