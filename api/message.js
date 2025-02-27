// api/message.js

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);
        const message = data.message;

        return {
            statusCode: 200,
            body: JSON.stringify({ message }),
        };
    }

    // Optional: handle GET requests
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "No message sent." }),
    };
};
