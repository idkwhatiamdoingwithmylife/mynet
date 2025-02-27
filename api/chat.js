let items = [];

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const { item } = JSON.parse(event.body);
        if (item && !items.find(msg => msg.text === item.text)) {
            const id = Date.now().toString(); // Unique ID based on timestamp
            items.push({ id, ...item });
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, items }),
            };
        }
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false }),
        };
    } else if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify({ items }),
        };
    } else if (event.httpMethod === 'DELETE') {
        const id = event.queryStringParameters.id;
        items = items.filter(msg => msg.id !== id);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ success: false }),
    };
};
