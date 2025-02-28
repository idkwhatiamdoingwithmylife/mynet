// In-memory store (not persistent across function calls)
let messages = [];

exports.handler = async function(event, context) {
    if (event.httpMethod === 'GET') {
        // Return the stored messages
        return {
            statusCode: 200,
            body: JSON.stringify({ items: messages }),
        };
    }

    if (event.httpMethod === 'POST') {
        // Save a new message
        try {
            const { item } = JSON.parse(event.body);
            if (!item) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Message is required.' }),
                };
            }

            // Add the new message to in-memory store
            messages.push(item);

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to save message.' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};
