import DatePicker from 'react-date-picker';
import { Switch } from '@mui/material'
import { useContext } from 'react';
const { PickDatacontext } = require('../contexts/DataContext');
const refresh_icon = require('../assets/images/refresh_icon.png');

export default function CustDatePicker({setDateRange, dateRange}){
    const {autoRefresh, setAutoRefresh} = useContext(PickDatacontext)

    return(
        <div style={{
            display: 'flex',
            color: 'black',
            fontSize: 15
        }}>
            <div className='flex flex-col items-center justify-center mr-6 text-sm'>
                Auto Refresh
                <Switch
                    checked={autoRefresh}
                    onChange={() => setAutoRefresh(was => !was)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
            <div>
                <div>
                    Start Date
                </div>
                <DatePicker clearIcon={null} value={dateRange.startDate} onChange={(date) => {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set('startDate', new Date(date).toLocaleDateString('en-US'));
                window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
                    setDateRange(was => {
                    return {
                        ...was,
                        startDate: new Date(date),
                    }
                })}} />
            </div>

            <div style={{ marginLeft: 10, }}>
                <div>
                    End Date
                </div>
                <DatePicker clearIcon={null} value={dateRange.endDate} onChange={(date) => {
                    const urlParams = new URLSearchParams(window.location.search);
                    urlParams.set('endDate', new Date(date).toLocaleDateString('en-US'));
                    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
                    setDateRange(was => {
                    return {
                        ...was,
                        endDate: new Date(date),
                    }
                })}} />
            </div>
            <img src={refresh_icon} style={{
                width: 30,
                height: 30, 
                marginLeft: 10,
                marginTop: 22,
                cursor: 'pointer'
            }}
            onClick={() => {
                const dates = dateRange
                setDateRange({
                    startDate: new Date(),
                    endDate: new Date(),
                })
                setTimeout(() => {
                    setDateRange(dates)
                }, 100)
            }}
            />
        </div>
    )
}