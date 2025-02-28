exports.handler = async (event) => {
    const chatLog = global.chatLog || [];

    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify({ items: chatLog })
        };
    } 
    
    if (event.httpMethod === 'POST') {
        try {
            const { item } = JSON.parse(event.body);
            if (!item || typeof item !== 'string' || item.trim() === '') {
                return { statusCode: 400, body: JSON.stringify({ success: false, error: "Message cannot be empty." }) };
            }
            chatLog.push(item);
            global.chatLog = chatLog.slice(-100); // Keep last 100 messages
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        } catch (error) {
            return { statusCode: 500, body: JSON.stringify({ success: false, error: "Server error." }) };
        }
    }
    
    return { statusCode: 405, body: JSON.stringify({ success: false, error: "Method not allowed." }) };
};
