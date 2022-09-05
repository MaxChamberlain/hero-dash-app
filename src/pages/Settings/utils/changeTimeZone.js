const axios = require('axios');
const URL = process.env.REACT_APP_API_URL;

export const changeTimeZone = async (_id, timezone, setUserInfo) => {
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    try {
        const {data} = await axios.post(
            URL + '/users/changetimezone', 
            { _id, timezone },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        localStorage.setItem('@ViDash:_userInfo', JSON.stringify({...data, token}))
        window.location.reload()
    }catch(e){
        if(e.response.status === 403){
            localStorage.clear()
            window.location.reload()
        }
        console.log(e)
    }
}