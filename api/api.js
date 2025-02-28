const accounts = {};  // This will store user data in memory for simplicity (Netlify serverless function doesn't allow file storage directly)
let messages = [];  // Store messages in memory as well

exports.handler = async (event, context) => {
    const { action, username, password, color, message } = JSON.parse(event.body || '{}');

    switch(action) {
        case 'createAccount':
            if (accounts[username]) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: 'Username already taken.' })
                };
            }
            
            if (username.length < 5 || password.length < 4) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: 'Username or password is too short.' })
                };
            }

            // Create account (store it in memory)
            accounts[username] = { password, color };
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true })
            };

        case 'sendMessage':
            if (!username || !message) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: 'Username and message are required.' })
                };
            }

            // Store message
            const newMessage = { username, message, color };
            messages.push(newMessage);

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, list: messages })
            };

        default:
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Invalid action.' })
            };
    }
};
