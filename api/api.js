const { parse } = require('querystring');

exports.handler = async (event) => {
    let responseMessage = 'Not connected';

    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        const computerName = body.computerName || 'Unknown';
        responseMessage = `Connected to ${computerName}`;
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: responseMessage }),
    };
};
