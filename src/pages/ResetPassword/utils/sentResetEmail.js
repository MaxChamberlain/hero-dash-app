const axios = require('axios');
const URL = process.env.REACT_APP_API_URL;

export async function sentResetEmail(email) {
    console.log(URL + '/users/requestpasswordchange')
    try {
        const response = await axios.post(
            URL + '/users/requestpasswordchange', 
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}