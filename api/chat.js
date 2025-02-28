exports.handler = async function(event, context) {
    if (event.httpMethod === 'GET') {
        const messages = [
            "Welcome to the chat!",
            "Enjoy chatting anonymously."
        ];

        return {
            statusCode: 200,
            body: JSON.stringify({ items: messages }),
        };
    }

    if (event.httpMethod === 'POST') {
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};
