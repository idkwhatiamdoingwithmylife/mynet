exports.handler = async (event) => {
    const messages = global.messages || [];

    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify({ items: messages })
        };
    } 
    
    if (event.httpMethod === 'POST') {
        try {
            const { item } = JSON.parse(event.body);
            if (!item || typeof item !== 'string' || item.trim() === '') {
                return { statusCode: 400, body: JSON.stringify({ success: false, error: "Invalid message." }) };
            }
            messages.push(item);
            global.messages = messages.slice(-100); // Keep only last 100 messages
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        } catch (error) {
            return { statusCode: 500, body: JSON.stringify({ success: false, error: "Server error." }) };
        }
    }
    
    return { statusCode: 405, body: JSON.stringify({ success: false, error: "Method not allowed." }) };
};
