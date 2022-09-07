const axios = require('axios');
const URL = process.env.REACT_APP_API_URL;

export const getDHLZone = async (origin_zips, destination_zips) => {
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    try{
        const { data } = await axios.post(
            `${URL}/dhl_zones/findone`,
            {
                origin_zip: origin_zips,
                destination_zip: destination_zips,
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