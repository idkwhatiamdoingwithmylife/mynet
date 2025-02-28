const users = [];

exports.handler = async function(event, context) {
    const { action, username, password } = JSON.parse(event.body);
    
    if (action === 'createAccount') {
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Username already taken' })
            };
        }
        users.push({ username, password });
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    }

    if (action === 'login') {
        const user = users.find(user => user.username === username && user.password === password);
        if (!user) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Invalid credentials' })
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, user })
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Invalid action' })
    };
};
