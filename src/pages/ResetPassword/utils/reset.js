const axios = require('axios');
const URL = process.env.REACT_APP_API_URL;

export const reset = async (oldPass, password, _id) => {
    try {
        const response = await axios.post(
            URL + '/users/resetpassword', 
            { oldPass, password, _id },
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
