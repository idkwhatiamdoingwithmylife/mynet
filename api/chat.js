const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'messages.json');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'GET') {
        // Read the stored messages
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const messages = JSON.parse(data);
            return {
                statusCode: 200,
                body: JSON.stringify({ items: messages }),
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to read messages.' }),
            };
        }
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

            // Read existing messages
            let data = fs.readFileSync(filePath, 'utf-8');
            let messages = JSON.parse(data);

            // Add the new message
            messages.push(item);

            // Write the updated messages to the file
            fs.writeFileSync(filePath, JSON.stringify(messages));

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
