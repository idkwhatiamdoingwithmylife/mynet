let items = [];

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const { item } = JSON.parse(event.body);
        items.push(item);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item added successfully' }),
        };
    } else if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify(items),
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }
};
