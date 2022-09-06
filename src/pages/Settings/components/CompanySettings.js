import { useEffect, useState } from 'react';
import { Switch } from "@mui/material"
const { changeRefreshToken } = require('../utils/changeRefreshToken');
const { getCompany, changeUseDHL } = require('../../../utils/functions/companyHandler/getCompany');

export default function CompanySettings(){
    const [ refresh_token, setRefreshToken ] = useState('');
    const [ company, setCompany ] = useState({ uses_dhl: false });

    useEffect(() => {
        const init = async () => {
            const company = await getCompany();
            setCompany(company.company);
        }
        init()
    }, [])

    return (
        <div className='text-slate-90 p-4'>
            <div className='flex justify-between'>
                <div className='md:text-2xl text-lg'>
                    Your Company Settings
                </div>
                <div className='border-2 border-green-400 text-sm py-1 px-3 rounded-lg cursor-pointer'
                onClick={() => changeRefreshToken(refresh_token)}>Save</div>
            </div>
                <div className='bg-slate-200 w-1/2 h-0.5 mb-4' style={{ borderRadius: '0 50% 50% 0' }}></div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Shiphero Refresh Token</p>
                    <input 
                        className='ml-4 border-2 border-slate-500 rounded text-sm'
                        type='text'
                        value={refresh_token}
                        onChange={(e) => setRefreshToken(e.target.value)}
                        placeholder='Enter refresh token'
                    />
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Uses DHL?</p>
                    <Switch
                        checked={company ? company.uses_dhl : false}
                        onChange={(e) => changeUseDHL(e.target.checked, setCompany)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        size='large'
                    />
                </div>
        </div>
    )
}
