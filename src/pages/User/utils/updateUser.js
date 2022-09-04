const axios = require('axios');
const URL = process.env.REACT_APP_API_URL

export const changeManagerPerms = (_id, value) => {
    try{
        const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
        const { data } = axios.post(
            URL + '/users/update',
            {
                _id,
                args: {
                    canManage: value
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        window.location.reload()
    }catch(e){
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}

export const changeAdminPerms = (_id, value) => {
    try{
        const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
        const { data } = axios.post(
            URL + '/users/update',
            {
                _id,
                args: {
                    isAdmin: value
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        window.location.reload()
    }catch(e){
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}

export const changeViewDollarPerms = (_id, value) => {
    try{
        const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
        const { data } = axios.post(
            URL + '/users/update',
            {
                _id,
                args: {
                    canSeeDollarAmounts: value
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        window.location.reload()
    }
    catch(e){
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}

export const changeExportPerms = (_id, value) => {
    try{
        const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
        const { data } = axios.post(
            URL + '/users/update',
            {
                _id,
                args: {
                    canExportData: value
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        window.location.reload()
    }
    catch(e){
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}

export const changeDrillDownPerms = (_id, value) => {
    try{
        const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
        const { data } = axios.post(
            URL + '/users/update',
            {
                _id,
                args: {
                    canDrillDown: value
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        window.location.reload()
    }
    catch(e){
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}


export const deleteUser = (_id) => {
    try{
        const token = JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token
        const { data } = axios.post(
            URL + '/users/delete',
            {
                _id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        window.location.href = '/users'
    }catch(e){
        if(e.response.status === 403){
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.reload()
        }
        console.error(e);
    }
}