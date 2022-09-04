const axios = require('axios')
const proxy = 'https://stark-oasis-84035.herokuapp.com/'

export const changeRefreshToken = async (refresh_token) => {
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
    try {
        const isValid = await checkToken(refresh_token)
        if(isValid){
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
            alert('Token changed successfully. Refreshing page...')
            window.location.reload()
        }else{
            alert('Invalid Refresh Token')
        }
    } catch (e) {
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}

const checkToken = async (refresh_token) => {
    try{
        const {data} = await axios.post(
            proxy + 'https://public-api.shiphero.com/auth/refresh',
            {
                "refresh_token": refresh_token
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-requested-with': 'XMLHttpRequest'
                }
            }
        )
        return true
    }catch(e){
        return false
        console.error(e)
    }
}