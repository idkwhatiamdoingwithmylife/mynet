let users = {};
let messages = [];

const generateGuestUsername = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    return `guest${randomNum}`;
};

const isUsernameTaken = (username) => {
    return Object.hasOwnProperty.call(users, username);
};

const addMessage = (username, message, color) => {
    const messageObj = { username, message, color };
    messages.push(messageObj);
};

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const requestBody = JSON.parse(event.body);
        const { action, username, password, color, message } = requestBody;

        if (action === 'createAccount') {
            if (username.length < 5) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: 'Username must be at least 5 characters long.' }),
                };
            }

            if (password.length < 4) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: 'Password must be at least 4 characters long.' }),
                };
            }

            if (isUsernameTaken(username)) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: 'Username already taken.' }),
                };
            }

            users[username] = { password, color };

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        }

        if (action === 'sendMessage') {
            const actualUsername = username || generateGuestUsername();

            if (!message || message.trim().length === 0) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: 'Message cannot be empty.' }),
                };
            }

            addMessage(actualUsername, message, color);

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, list: messages }),
            };
        }
    } else {
        // Default response for GET requests
        return {
            statusCode: 200,
            body: JSON.stringify({ list: messages }),
        };
    }
};
