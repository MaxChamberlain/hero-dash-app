const axios = require('axios');

export const sendInvite = async (email) => {
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
    const sender = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).first_name + ' ' + JSON.parse(localStorage.getItem('@ViDash:_userInfo')).last_name
    try{
        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/invite`,
            {
                email,
                company_code,
                sender,
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