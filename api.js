let connectedIP = 'No IP connected';

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        connectedIP = body.ip;
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `IP updated to ${connectedIP}` }),
        };
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Connected to ${connectedIP}` }),
        };
    }
};
