let messages = [];

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const { username, message } = JSON.parse(event.body);
        if (username && message) {
            messages.push({ username, message });
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, messages }),
            };
        }
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false }),
        };
    } else if (event.httpMethod === 'GET') {
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
