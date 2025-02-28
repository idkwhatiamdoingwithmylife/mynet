let list = [];  // In-memory list to store the data (note: this resets every time the server restarts)

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);

        if (body.action === 'add') {
            // Add "hi" to the list
            list.push('hi');
        }
    }

    // Respond with the current list
    return {
        statusCode: 200,
        body: JSON.stringify({ list: list })
    };
};
