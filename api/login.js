const accounts = {};  // Store accounts in memory

exports.handler = async (event, context) => {
    const { action, username, password } = JSON.parse(event.body || '{}');

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

            accounts[username] = { password, color: '#000000' };  // Default color
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true })
            };

        case 'login':
            if (!accounts[username] || accounts[username].password !== password) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: 'Invalid username or password.' })
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, username, color: accounts[username].color })
            };

        default:
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Invalid action.' })
            };
    }
};
