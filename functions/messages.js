const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const messagesFilePath = path.join(__dirname, 'messages.json');

    if (event.httpMethod === 'POST') {
        const { username, message } = JSON.parse(event.body);
        const newMessage = { username, message, timestamp: new Date().toISOString() };

        // Load existing messages from messages.json
        let messages = [];
        if (fs.existsSync(messagesFilePath)) {
            const data = fs.readFileSync(messagesFilePath);
            messages = JSON.parse(data);
        }

        // Add new message and save
        messages.push(newMessage);
        fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent' })
        };
    } else if (event.httpMethod === 'GET') {
        if (fs.existsSync(messagesFilePath)) {
            const data = fs.readFileSync(messagesFilePath);
            return {
                statusCode: 200,
                body: JSON.stringify(JSON.parse(data))
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify([])
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method not allowed' })
    };
};
