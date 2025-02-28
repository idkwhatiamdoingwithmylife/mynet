const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'messages.json');

exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: headers,
        };
    }

    if (event.httpMethod === 'GET') {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const messages = JSON.parse(data);
            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({ items: messages }),
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ error: 'Failed to read messages.' }),
            };
        }
    }

    if (event.httpMethod === 'POST') {
        try {
            const { item } = JSON.parse(event.body);
            if (!item) {
                return {
                    statusCode: 400,
                    headers: headers,
                    body: JSON.stringify({ error: 'Message is required.' }),
                };
            }

            const data = fs.readFileSync(filePath, 'utf-8');
            let messages = JSON.parse(data);

            messages.push(item);
            fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

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
