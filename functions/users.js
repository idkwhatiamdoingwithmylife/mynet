const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const dataPath = path.join(__dirname, 'users.json');

    // Read existing users
    const readUsers = () => {
        if (fs.existsSync(dataPath)) {
            const data = fs.readFileSync(dataPath);
            return JSON.parse(data);
        }
        return [];
    };

    // Write users to file
    const writeUsers = (users) => {
        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
    };

    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        const users = readUsers();

        // Check if user already exists
        const existingUser = users.find(user => user.username === body.username);
        if (existingUser) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Username already exists.' }),
            };
        }

        // Create a new user
        users.push({ username: body.username, password: body.password });
        writeUsers(users);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User registered successfully.' }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method not allowed.' }),
    };
};
