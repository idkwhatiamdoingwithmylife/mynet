let connectedIP = 'No IP connected';

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        connectedIP = body.ip;
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: `IP updated to ${connectedIP}` }),
        };
    } else {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: `Connected to ${connectedIP}` }),
        };
    }
};
