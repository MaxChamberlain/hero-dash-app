import Speedometer, { Arc, Progress, Indicator } from 'react-speedometer';
import { useState, useEffect } from 'react';
import { getData } from "../../../utils/functions/temp_get_db_person_data"
import Loading from '../../../components/Loading';

export default function CustSpeedometer({ dateRange, setDateRange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData(dateRange.startDate, dateRange.endDate, setLoading, setError);
            setData(returnedData)
        }
        refreshData()
    }, [dateRange])

    useEffect(() => { 
        const refreshData = async () => {
            const returnedData = await getData(dateRange.startDate, dateRange.endDate, setLoading, setError);
            setData(returnedData)
        }
        refreshData()
    }, [])

    useEffect(() => {
        if(error){
            setLoading(false)
        }
    }, [error])

    console.log(data.reduce((a, b) => a + b.items_picked, 0))

    if(loading){
        return <Loading />
    }else if(error){
        return(
            <div>Error</div>
        )
    }else{
    return(
        <div style={{
            flexBasis: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <div style={{
                backgroundColor: 'var(--dark-1)',
                borderRadius: 10,
                marginBottom: 30,
                padding: 20,
                width: 'fit-content',
            }}>
                <div style={{ marginBottom: 10, fontSize: 25, textAlign: 'center' }}><span style={{color: '#ffbb00'}}>Picked</span> VS <span style={{color: '#ff8000'}}>Packed</span></div>
                <Speedometer 
                    value={data.reduce((a, b) => a + b.items_picked, 0)} 
                    max={data.reduce((a, b) => a + b.items_packed, 0) + data.reduce((a, b) => a + b.items_picked, 0)}
                    accentColor='#ffbb00'
                    angle='280'
                >
                    <Arc arcWidth={20} color='#ff8000' opacity={0.8} lineCap='round' />
                    <Progress arcWidth={20} lineCap='round' />
                    <Indicator>
                        {(value, textProps) => {
                        return <><text
                            {...textProps} // textProps has the "transform" property only
                            fontSize={20}
                            x={250 / 2}
                            fill='#ffbb00'
                            y={250 / 2 - 30}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                        >
                            {data.reduce((a, b) => a + b.items_picked, 0)} items picked
                        </text>
                        <text
                            {...textProps} // textProps has the "transform" property only
                            fontSize={20}
                            x={250 / 2}
                            fill='#ff8000'
                            y={250 / 2 + 20}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                        >
                            {data.reduce((a, b) => a + b.items_packed, 0)} items packed
                        </text>
                        </>
                        }}
                    </Indicator>
                </Speedometer>
            </div>
        </div>
    )
    }
}