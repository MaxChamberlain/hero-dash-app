const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export const handleRegister = async (first_name, last_name, email_address, password, company_name, company_code, setError) => {
    try{
        const { data } = await axios.post(
            `${URL}/users/register`, 
            {
            first_name, last_name, email_address, password, company_name, company_code
        })
        console.log(data)
        localStorage.setItem('@ViDash:_userInfo', JSON.stringify(data))
        window.location.reload()
        return data
    }catch(e){
        console.log(e)
        setError(e.response.data.message)
        setTimeout(() => setError(''), 5000)
    }
}

export const handleLogin = async (email_address, password, setError) => {
    email_address = email_address.toLowerCase()
    try{
        const { data } = await axios.post(
            `${URL}/users/login`, 
            {
            email_address, password
        })
        localStorage.setItem('@ViDash:_userInfo', JSON.stringify(data))
        window.location.reload()
        return data
    }catch(e){
        console.log(e)
        setError(e.response.data.message)
        setTimeout(() => setError(''), 5000)
    }
}