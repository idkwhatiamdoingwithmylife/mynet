let messages = [];
let messagesKey = 'CHAT_MESSAGES';

exports.handler = async function(event, context) {
    if (process.env[messagesKey]) {
        messages = JSON.parse(process.env[messagesKey]);
    }

    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);

        if (body.action === 'sendMessage' && body.message && body.color) {
            let username = body.username.trim();
            if (!username) {
                username = "Guest" + Math.floor(10000 + Math.random() * 90000);
            }

            messages.push({
                username: username,
                message: body.message,
                color: body.color
            });

            process.env[messagesKey] = JSON.stringify(messages);
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ list: messages })
    };
};
