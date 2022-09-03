import { useState } from 'react';
const { changeRefreshToken } = require('../utils/changeRefreshToken');

export default function CompanySettings(){
    const [ refresh_token, setRefreshToken ] = useState('');
    return (
        <div className='text-slate-90 p-4'>
            <div className='flex justify-between'>
                <h1>Company Settings</h1>
                <div className='border-2 border-green-400 text-sm py-1 px-3 rounded-lg cursor-pointer'
                onClick={() => changeRefreshToken(refresh_token)}>Save</div>
            </div>
                <table className='text-lg w-full'>
                    <thead className='font-bold'>
                        <tr className='flex justify-between w-full max-w-3xl'>
                            <td>Setting</td>
                            <td> Value</td>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        <tr className='flex justify-between w-full max-w-3xl'>
                            <td>Shiphero Refresh Token</td>
                            <td>
                                <input 
                                    className='ml-4 border-2 border-slate-500 rounded text-sm p-2'
                                    type='text'
                                    value={refresh_token}
                                    onChange={(e) => setRefreshToken(e.target.value)}
                                />    
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
    )
}
