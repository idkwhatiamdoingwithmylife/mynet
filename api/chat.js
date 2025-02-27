let connections = [];

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        // Handle WebSocket connection here
        // Note: This part depends on your WebSocket server implementation
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'WebSocket connection established.' }),
        };
    } else if (event.httpMethod === 'POST') {
        const { message } = JSON.parse(event.body);

        // Broadcast the message to all connected clients
        connections.forEach((connection) => {
            connection.send(message);
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ success: false }),
    };
};

// WebSocket handling code (pseudo-code, implement according to your WebSocket library)
function handleConnection(socket) {
    connections.push(socket);
    
    socket.on('message', (message) => {
        connections.forEach((conn) => {
            if (conn !== socket) conn.send(message);
        });
    });

    socket.on('close', () => {
        connections = connections.filter((conn) => conn !== socket);
    });
}
