// api/chat.js
exports.handler = async function(event, context) {
    const messages = [
        "Welcome to the chat!",
        "Enjoy chatting anonymously."
    ];

    if (event.httpMethod === 'GET') {
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
