let items = [];

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const { item } = JSON.parse(event.body);
        if (item && !items.includes(item)) {
            items.push(item);
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
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ success: false }),
    };
};
