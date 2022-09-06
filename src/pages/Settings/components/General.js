import { Switch } from "@mui/material"
import { useState, useEffect } from "react"
import TimezoneSelect from "react-timezone-select"
const { changePackageReport, changePickingPackingReport } = require("../utils/changeReports")
const { changeTimeZone } = require("../utils/changeTimeZone")
const { sendTestPickPack, sendTestPackage } = require("../utils/sendTestReport")

export default function General(){
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('@ViDash:_userInfo')))
    const [selectedTimezone, setSelectedTimezone] = useState({})

    useEffect(() => {
        if(selectedTimezone.value)
             changeTimeZone(userInfo._id, selectedTimezone.value, setUserInfo)
    }, [selectedTimezone])

    return (
        <div className='text-slate-900'>
            <h1>General</h1>
            <div className='flex flex-col'>
                <div className='md:text-2xl text-lg'>
                    You
                </div>
                <div className='bg-slate-200 w-1/2 h-0.5 mb-4' style={{ borderRadius: '0 50% 50% 0' }}></div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Full Name</p>
                    <p className='text-base md:ml-12'>{userInfo.first_name + ' ' + userInfo.last_name}</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Time Zone</p>
                    <p className='text-base md:ml-12'>{new Date().toLocaleString("en-US", {timeZone: userInfo.timezone, timeZoneName: 'long'}).includes('AM') ?
                                                    new Date().toLocaleString("en-US", {timeZone: userInfo.timezone, timeZoneName: 'long'})
                                                        .replace(new Date().toLocaleDateString('en-US'), '')
                                                        .replace(/,/g, '')
                                                        .split('AM')[1]
                                                        .trim()
                                                        :
                                                    new Date().toLocaleString("en-US", {timeZone: userInfo.timezone, timeZoneName: 'long'})
                                                        .replace(new Date().toLocaleDateString('en-US'), '')
                                                        .replace(/,/g, '')
                                                        .split('PM')[1]
                                                        .trim()
                        }
                    </p>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Change Timezone</p>
                    <div className='w-1/2'>
                        <TimezoneSelect
                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
                        />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Email Address</p>
                    <p className='text-base md:ml-12'>{userInfo.email_address}</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Dark Mode</p>
                    <p className='text-base md:ml-12'>{userInfo.theme_preference === 'dark' ? 'Yes' : 'No'}</p>
                </div>

                <div className='md:text-2xl text-lg mt-5'>
                    Receive End of Day Reports
                </div>
                <div className='bg-slate-200 w-1/2 h-0.5 mb-4' style={{ borderRadius: '0 50% 50% 0' }}>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Picking and Packing KPIs</p>
                    <div className='flex'>
                        <Switch
                            checked={userInfo.picking_packing_report}
                            onChange={(e) => changePickingPackingReport(userInfo._id, e.target.checked, setUserInfo)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            size='large'
                        />
                        <div className='border-2 border-slate-600 py-2 px-4 rounded cursor-pointer' onClick={() => sendTestPickPack()}>Test</div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Package KPIs</p>
                    <div className='flex'>
                        <Switch
                            checked={userInfo.package_report}
                            onChange={(e) => changePackageReport(userInfo._id, e.target.checked, setUserInfo)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            size='large'
                        />
                        <div className='border-2 border-slate-600 py-2 px-4 rounded cursor-pointer' onClick={() => sendTestPackage()}>Test</div>
                    </div>
                </div>

                <div className='md:text-2xl text-lg mt-5'>
                    Permissions
                </div>
                <div className='bg-slate-200 w-1/2 h-0.5 mb-4' style={{ borderRadius: '0 50% 50% 0' }}>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Admin</p>
                    <p className='text-base md:ml-12'>{userInfo.isAdmin ? 'Yes' : 'No'}</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Manager</p>
                    <p className='text-base md:ml-12'>{userInfo.canManage || userInfo.isAdmin ? 'Yes' : 'No'}</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Can See Dollar Amounts</p>
                    <p className='text-base md:ml-12'>{userInfo.canSeeDollarAmounts || userInfo.isAdmin ? 'Yes' : 'No'}</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Can Export Data</p>
                    <p className='text-base md:ml-12'>{userInfo.canExportData || userInfo.isAdmin ? 'Yes' : 'No'}</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between w-1/2 mb-5'>
                    <p className='text-base'>Can Drill Down</p>
                    <p className='text-base md:ml-12'>{userInfo.canDrillDown || userInfo.isAdmin ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </div>
    )
}