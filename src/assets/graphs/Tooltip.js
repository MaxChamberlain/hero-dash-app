export const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload) {
        return (
        <div 
        className={'bg-slate-700'}
        style={{
            margin: 0,
            fontSize: 15,
            textAlign: 'center',
            padding: 10
        }}>
            <div 
            style={{
                fontSize: 20,
            padding: 10,
            fontWeight: 'bold',
            color: 'white'
        }}>{label}</div>

            {payload && payload.map(entry => 
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}> 
                    <div style={{
                        backgroundColor: entry.fill,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                    }}></div>
                    <p style={{
                        padding: 10,
                        paddingTop: 0,
                        marginBottom: 0,
                        color: 'white'
                    }}>
                        {entry.value} {entry.dataKey.split('_').map(e => e.slice(0,1).toUpperCase() + e.slice(1).toLowerCase()).join(' ')}
                    </p>
                </div>
            )}
        </div>
        );
    }
    return null;
}