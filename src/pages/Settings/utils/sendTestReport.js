const axios = require('axios');
const URL = process.env.REACT_APP_API_URL;

export const sendTestPickPack = async () => {
    try{
        const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
        const { data } = await axios.post(
            `${URL}/sendtestemail/picks`,
            {
                _id: JSON.parse(localStorage.getItem('@ViDash:_userInfo'))._id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return data
    }catch(e){
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}

export const sendTestPackage = () => {
    alert('package')
}