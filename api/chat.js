let items = [];

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const { message } = JSON.parse(event.body);
        if (message && message.text.length <= 1000) {
            items.push({ name: message.name, text: message.text });
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
        const index = event.queryStringParameters?.index;
        if (index !== undefined && index >= 0 && index < items.length) {
            items.splice(index, 1);
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        }
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false }),
        };
    }
    return {
        statusCode: 405,
        body: JSON.stringify({ success: false }),
    };
};
