const users = [];

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const { username, password } = JSON.parse(event.body);

        // Check if it's a registration or login
        if (event.path.endsWith('/users')) {
            // Registration logic
            if (users.find(user => user.username === username)) {
                return { statusCode: 400, body: 'User already exists' };
            }
            users.push({ username, password }); // Store user
            return { statusCode: 201, body: 'User created' };
        } else if (event.path.endsWith('/login')) {
            // Login logic
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                return { statusCode: 200, body: 'Login successful' };
            } else {
                return { statusCode: 401, body: 'Invalid username or password' };
            }
        }
    }
    return { statusCode: 405, body: 'Method Not Allowed' };
};
