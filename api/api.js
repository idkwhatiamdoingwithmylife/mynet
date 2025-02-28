exports.handler = async function(event, context) {
    const { action, username, message, color } = JSON.parse(event.body);
    
    let list = JSON.parse(process.env.LIST || '[]');
    
    if (action === 'sendMessage') {
        list.push({ username, message, color });
        process.env.LIST = JSON.stringify(list);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, list })
        };
    }
    
    return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Invalid action' })
    };
};
