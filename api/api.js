let messages = [];
let messagesKey = 'CHAT_MESSAGES';

exports.handler = async function(event, context) {
    if (process.env[messagesKey]) {
        messages = JSON.parse(process.env[messagesKey]);
    }

    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);

        if (body.action === 'sendMessage' && body.username && body.message && body.color) {
            messages.push({
                username: body.username,
                message: body.message,
                color: body.color
            });
        }

        process.env[messagesKey] = JSON.stringify(messages);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ list: messages })
    };
};
