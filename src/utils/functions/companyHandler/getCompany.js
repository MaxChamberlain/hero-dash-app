const axios = require('axios');
const URL = process.env.REACT_APP_API_URL;

export const getCompany = async () => {
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
    try {
        const {data} = await axios.post(
            URL + '/company/getone', 
            { company_code },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return data
    }catch(e){
        if(e.response.status === 403){
            localStorage.clear()
            window.location.reload()
        }
        console.log(e)
    }
}

export const changeUseDHL = async (uses_dhl, setCompany) => {
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
    try {
        const {data} = await axios.post(
            URL + '/company/changedhlsetting', 
            { company_code, uses_dhl },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        setCompany(data)
    }catch(e){
        if(e.response.status === 403){
            localStorage.clear()
            window.location.reload()
        }
        console.log(e)
    }
}

export const changeUseLoopReturns = async (uses_loop_returns, setCompany) => {
    const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
    const company_code = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).company_code
    try {
        const {data} = await axios.post(
            URL + '/company/changeloopreturnssetting', 
            { company_code, uses_loop_returns },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        setCompany(data)
    }catch(e){
        if(e.response.status === 403){
            localStorage.clear()
            window.location.reload()
        }
        console.log(e)
    }
}