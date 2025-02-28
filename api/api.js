let messages = [];
let users = {};
let messagesKey = 'CHAT_MESSAGES';
let usersKey = 'CHAT_USERS';

exports.handler = async function(event, context) {
    if (process.env[messagesKey]) {
        messages = JSON.parse(process.env[messagesKey]);
    }
    if (process.env[usersKey]) {
        users = JSON.parse(process.env[usersKey]);
    }

    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);

        if (body.action === 'createAccount' && body.username && body.password && body.color) {
            if (users[body.username]) {
                return { statusCode: 200, body: JSON.stringify({ success: false }) };
            }

            users[body.username] = { password: body.password, color: body.color };
            process.env[usersKey] = JSON.stringify(users);

            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        }

        if (body.action === 'login' && body.username && body.password) {
            if (users[body.username] && users[body.username].password === body.password) {
                return { statusCode: 200, body: JSON.stringify({ success: true, color: users[body.username].color }) };
            }
            return { statusCode: 200, body: JSON.stringify({ success: false }) };
        }

        if (body.action === 'sendMessage' && body.username && body.message && users[body.username]) {
            messages.push({ username: body.username, message: body.message, color: users[body.username].color });
            process.env[messagesKey] = JSON.stringify(messages);
        }
    }

    return { statusCode: 200, body: JSON.stringify({ list: messages }) };
};
