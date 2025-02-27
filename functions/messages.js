let messages = [];

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify(messages),
        };
    } else if (event.httpMethod === 'POST') {
        const { username, message } = JSON.parse(event.body);
        if (username && message) {
            messages.push({ username, message });
            return { statusCode: 201, body: '' };
        }
        return { statusCode: 400, body: 'Bad Request' };
    }
    return { statusCode: 405, body: 'Method Not Allowed' };
};
