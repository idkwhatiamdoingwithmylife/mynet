let items = [];

exports.handler = async (event, context) => {
    // Add CORS headers to allow requests from other domains
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'POST') {
        const { item } = JSON.parse(event.body);
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
};
