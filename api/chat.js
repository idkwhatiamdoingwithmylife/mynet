exports.handler = async function(event, context) {
    // Handle GET request (return hardcoded messages for now)
    if (event.httpMethod === 'GET') {
        const messages = [
            { name: 'User1', message: 'Hello!' },
            { name: 'User2', message: 'Hi there!' }
        ];
        return {
            statusCode: 200,
            body: JSON.stringify({ items: messages }),  // Return the messages as JSON
        };
    }

    // Handle POST request (store and respond to new message)
    if (event.httpMethod === 'POST') {
        try {
            const { name, message } = JSON.parse(event.body);

            // Validation
            if (!name || !message) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Name and message are required.' }),
                };
            }

            // For now, we return a success message after receiving data
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, name, message }),  // Send back the received data
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to process message.' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};
