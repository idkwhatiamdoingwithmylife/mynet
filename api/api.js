let messages = [];

exports.handler = async (event, context) => {
    const { action, username, message, color } = JSON.parse(event.body || '{}');

    switch(action) {
        case 'sendMessage':
            if (!username || !message) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: 'Username and message are required.' })
                };
            }

            const newMessage = { username, message, color };
            messages.push(newMessage);

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, list: messages })
            };

        default:
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Invalid action.' })
            };
    }
};
