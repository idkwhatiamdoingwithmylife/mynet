exports.handler = async (event) => {
    const messages = global.messages || [];
    
    if (event.httpMethod === "POST") {
        const data = JSON.parse(event.body || "{}");
        
        if (data.action === "sendMessage") {
            messages.push({ username: data.username, message: data.message, color: data.color });

            global.messages = messages.slice(-100);
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        }
    }

    return { statusCode: 200, body: JSON.stringify({ list: messages }) };
};
