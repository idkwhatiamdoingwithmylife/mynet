let messages = [];

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const { message } = JSON.parse(event.body);
        if (message && message.length <= 1000) {
            messages.push(message);
            if (messages.length > 50) messages.shift();
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        }
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, error: "Message too long or empty" }),
        };
    }

    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify({ messages }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ success: false }),
    };
};
