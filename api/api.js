exports.handler = async (event) => {
    let responseMessage = 'Not connected';

    if (event.httpMethod === 'POST') {
        try {
            const body = JSON.parse(event.body);
            const computerName = body.computerName || 'Unknown';
            responseMessage = `Connected to ${computerName}`;
        } catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid request body' }),
            };
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: responseMessage }),
    };
};
