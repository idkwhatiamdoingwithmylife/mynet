let items = [];

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    try {
        if (event.httpMethod === 'POST') {
            const { item } = JSON.parse(event.body);  // Parse the incoming JSON body
            if (!item || typeof item !== 'string') {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ message: 'Invalid item format' }),
                };
            }
            items.push(item);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'Item added successfully' }),
            };
        } else if (event.httpMethod === 'GET') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(items),
            };
        } else {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ message: 'Method Not Allowed' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: 'Server error', error: error.message }),
        };
    }
};
