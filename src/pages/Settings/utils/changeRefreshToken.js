const axios = require('axios')

export const changeRefreshToken = async (refresh_token) => {
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
    try {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/company/changetoken`,
            {
                refresh_token,
                company_code
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token}`
                }
            }
        )
        window.location.reload()
    } catch (e) {
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}