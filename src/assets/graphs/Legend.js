export const CustomizedLegend = ({ payload, label, active }) => {
    if (payload) {
        return (
        <div style={{
            display: 'flex',
            width: '100%',
            color: 'black',
            fontSize: 20,
            justifyContent: 'center',
        }}>
            {payload.map((entry, index) => (
                <div key={`item-${index}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                    marginBottom: 10,
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20,
                        height: 15,
                        backgroundColor: entry.color,
                    }}></div>
                    <div style={{
                        marginTop: 5,
                        fontSize: 12,
                        fontWeight: 'bold',
                        marginLeft: 10,
                        marginRight: 20,
                    }}>{entry.dataKey.split('_').map(e => e.slice(0,1).toUpperCase() + e.slice(1).toLowerCase()).join(' ')}</div>
                </div>
            ))}
        </div>
        );
    }
    return null;
}