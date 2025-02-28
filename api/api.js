// api.js - Server-side message storage and auto-deletion logic

const messages = [];

// Add a new message with a timestamp
const addMessage = (message) => {
    const timestamp = Date.now();
    messages.push({ message, timestamp });
};

// Delete messages older than 10 minutes
const deleteExpiredMessages = () => {
    const now = Date.now();
    const tenMinutesAgo = now - (10 * 60 * 1000);
    // Remove messages older than 10 minutes
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].timestamp < tenMinutesAgo) {
            messages.splice(i, 1);
        }
    }
};

// Fetch all messages
const getMessages = () => {
    deleteExpiredMessages();
    return messages.map(msg => msg.message);
};

// Endpoint to fetch all messages
exports.handler = async (event, context) => {
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify(getMessages())
        };
    }

    if (event.httpMethod === "POST") {
        const { message } = JSON.parse(event.body);
        addMessage(message);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Message added successfully!" })
        };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
};
