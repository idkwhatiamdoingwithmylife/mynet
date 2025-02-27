const axios = require('axios');

exports.handler = async (event, context) => {
    try {
        // Get public IP using an external service
        const response = await axios.get('https://api.ipify.org?format=json');
        const publicIP = response.data.ip;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Connected to ${publicIP}` }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to fetch public IP' }),
        };
    }
};
