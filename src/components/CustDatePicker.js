import DatePicker from 'react-date-picker';
const refresh_icon = require('../assets/images/refresh_icon.png');

export default function CustDatePicker({setDateRange, dateRange}){
    return(
        <div style={{
            display: 'flex',
            color: 'black',
            fontSize: 15
        }}>
            <div>
                <div>
                    Start Date
                </div>
                <DatePicker clearIcon={null} value={dateRange.startDate} onChange={(date) => setDateRange(was => {
                    return {
                        ...was,
                        startDate: new Date(date),
                    }
                })} />
            </div>

            <div style={{ marginLeft: 10, }}>
                <div>
                    End Date
                </div>
                <DatePicker clearIcon={null} value={dateRange.endDate} onChange={(date) => setDateRange(was => {
                    return {
                        ...was,
                        endDate: new Date(date),
                    }
                })} />
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