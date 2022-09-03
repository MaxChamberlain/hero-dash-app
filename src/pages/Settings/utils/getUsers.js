const axios = require('axios')

export const getUsers = async () => {
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/getall`,
            {
                company_code
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token}`
                }
            }
        )
        console.log('data', data)
        return data
    } catch (e) {
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}