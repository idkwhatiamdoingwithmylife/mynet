let messages = [];

exports.handler = async function(event, context) {
    // Set the CORS headers to allow cross-origin requests
    const headers = {
        'Access-Control-Allow-Origin': '*',  // Allow all domains, you can restrict this for security
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.httpMethod === 'OPTIONS') {
        // If the browser sends an OPTIONS request (preflight), just return CORS headers
        return {
            statusCode: 204,
            headers: headers,
        };
    }

    if (event.httpMethod === 'GET') {
        // Return the stored messages
        return {
            statusCode: 200,
            headers: headers,
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
                    headers: headers,
                    body: JSON.stringify({ error: 'Message is required.' }),
                };
            }

            // Add the new message to in-memory store
            messages.push(item);

            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({ success: true }),
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ error: 'Failed to save message.' }),
            };
        }
    }

    return {
        statusCode: 405,
        headers: headers,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};
