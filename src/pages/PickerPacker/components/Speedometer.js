import Speedometer, { Arc, Progress, Indicator } from 'react-speedometer';
import { useContext } from 'react';
import Loading from '../../../components/Loading';
const { PickDatacontext } = require('../../../contexts/DataContext');

export default function CustSpeedometer({ dateRange, setDateRange }) {

    const PickDataContext = useContext(PickDatacontext)

    if(PickDataContext.loading){
        return <Loading />
    }else if(PickDataContext.error){
        return(
            <div className='text-red'>
                Error
            </div>
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
                    value={PickDataContext.pickerPersonData.reduce((a, b) => a + b.items_picked, 0)} 
                    max={PickDataContext.pickerPersonData.reduce((a, b) => a + b.items_packed, 0) + PickDataContext.pickerPersonData.reduce((a, b) => a + b.items_picked, 0)}
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
                            {PickDataContext.pickerPersonData.reduce((a, b) => a + b.items_picked, 0)} items picked
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
                            {PickDataContext.pickerPersonData.reduce((a, b) => a + b.items_packed, 0)} items packed
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