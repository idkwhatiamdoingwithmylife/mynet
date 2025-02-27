// api/message.js

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);
        const message = data.message;

        // Return the received message
        return {
            statusCode: 200,
            body: JSON.stringify({ message }),
        };
    }

    // Handle GET request (optional)
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "No message sent." }),
    };
};
