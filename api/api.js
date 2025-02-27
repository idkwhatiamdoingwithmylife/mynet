let messages = [];

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const { message } = JSON.parse(event.body);
        if (!message || message.length > 1000) {
            return { statusCode: 400, body: JSON.stringify({ success: false }) };
        }
        messages.push(message);
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    if (event.httpMethod === 'GET') {
        return { statusCode: 200, body: JSON.stringify({ messages }) };
    }

    return { statusCode: 405, body: JSON.stringify({ success: false }) };
};
