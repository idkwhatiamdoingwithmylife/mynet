// api.js (Netlify Function)

let users = [];
let messages = [];

exports.handler = async (event, context) => {
  const { action } = JSON.parse(event.body || '{}');
  const response = {
    statusCode: 200,
    body: JSON.stringify({ success: true, list: messages }), // Ensure the messages are sent as part of the response
  };

  // Handle creating a new account (username and password)
  if (action === 'createAccount') {
    const { username, password, color } = JSON.parse(event.body);

    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      response.statusCode = 400;
      response.body = JSON.stringify({ success: false, message: 'Username already exists' });
      return response;
    }

    // Add the new user to the in-memory array
    users.push({ username, password, color });
    return response;
  }

  // Handle sending a message
  if (action === 'sendMessage') {
    const { username, message, color } = JSON.parse(event.body);

    // Store the message
    messages.push({ username, message, color });

    return response;
  }

  // Default response if no action matches
  response.statusCode = 400;
  response.body = JSON.stringify({ success: false, message: 'Invalid action' });
  return response;
};
