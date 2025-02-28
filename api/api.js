let list = [];  // In-memory list to store the data (note: this resets every time the server restarts)

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);  // Parse the request body
        
        if (body.action === 'add') {
            // Add "hi" to the list
            list.push('hi');
        }

        if (body.action === 'remove') {
            // Remove the last "hi" from the list
            const index = list.lastIndexOf('hi');
            if (index !== -1) {
                list.splice(index, 1);  // Remove the element from the list
            }
        }
    }

    // Respond with the current list after any modifications
    return {
        statusCode: 200,
        body: JSON.stringify({ list: list })
    };
};
