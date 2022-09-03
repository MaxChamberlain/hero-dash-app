const axios = require('axios')

export const getUser = async (_id) => {
    try{
        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/getone`,
            {
                _id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token}`
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