const axios = require('axios');
const URL = process.env.REACT_APP_API_URL;

export const changePickingPackingReport = async (_id, value, setUserInfo) => {
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    try {
        const {data} = await axios.post(
            URL + '/users/changepickpackreport', 
            { _id, value },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        localStorage.setItem('@ViDash:_userInfo', JSON.stringify({...data, token}))
        setUserInfo(data);
    }catch(e){
        if(e.response.status === 403){
            localStorage.clear()
            window.location.reload()
        }
        console.log(e)
    }
}

export const changePackageReport = async (_id, value, setUserInfo) => {
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    try {
        const {data} = await axios.post(
            URL + '/users/changepackagereport', 
            { _id, value },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        localStorage.setItem('@ViDash:_userInfo', JSON.stringify({...data, token}))
        setUserInfo(data);
    }catch(e){
        if(e.response.status === 403){
            localStorage.clear()
            window.location.reload()
        }
        console.log(e)
    }
}
