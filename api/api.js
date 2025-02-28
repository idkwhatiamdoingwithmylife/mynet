const messages = [];

const addMessage = (message) => {
    if (message.length <= 1000) {
        messages.push(message);
    }
};

const getMessages = () => {
    return messages;
};

exports.handler = async (event, context) => {
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify(getMessages())
        };
    }

    if (event.httpMethod === "POST") {
        const { message } = JSON.parse(event.body);
        addMessage(message);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Message added successfully!" })
        };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
};
