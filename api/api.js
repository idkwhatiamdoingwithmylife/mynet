let messages = [];
let messagesKey = 'MESSAGES_LIST';

exports.handler = async function(event, context) {
    if (process.env[messagesKey]) {
        messages = JSON.parse(process.env[messagesKey]);
    }

    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);

        if (body.action === 'sendMessage' && body.message) {
            messages.push(body.message);
        }

        process.env[messagesKey] = JSON.stringify(messages);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ list: messages })
    };
};
