import { useState } from 'react';
const { changeRefreshToken } = require('../utils/changeRefreshToken');

export default function CompanySettings(){
    const [ refresh_token, setRefreshToken ] = useState('');
    return (
        <div className='text-slate-90 p-4'>
            <div className='flex justify-between'>
                <h1>Company Settings</h1>
                <div className='border-2 border-green-400 text-3xl p-2 rounded-lg cursor-pointer'
                onClick={() => changeRefreshToken(refresh_token)}>Save</div>
            </div>
                <table className='text-2xl w-full'>
                    <thead className='font-bold'>
                        <tr>
                            <td>Setting</td>
                            <td> Value</td>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        <tr>
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
