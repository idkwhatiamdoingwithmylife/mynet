const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const usersFilePath = path.join(__dirname, 'users.json');

    if (event.httpMethod === 'POST') {
        const { username, password } = JSON.parse(event.body);
        let users = [];

        if (fs.existsSync(usersFilePath)) {
            const data = fs.readFileSync(usersFilePath);
            users = JSON.parse(data);
        }

        const userExists = users.some(user => user.username === username);

        if (userExists) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'User already exists' })
            };
        }

        users.push({ username, password });
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User created successfully' })
        };
    } else if (event.httpMethod === 'GET') {
        // Handle user login if necessary
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method not allowed' })
    };
};
