import PickerPackerLink from './OptionsDropdown/PickerPackerLink';
import PackagesLink from './OptionsDropdown/PackagesLink';

export default function KPIPages(){
    return (
        <div className="w-full text-white shadow-full" style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
        }}>
            <PickerPackerLink />
            <PackagesLink />
        </div>
    )
}