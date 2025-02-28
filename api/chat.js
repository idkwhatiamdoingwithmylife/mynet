exports.handler = async function(event, context) {
  // Check if the method is GET or POST
  if (event.httpMethod === 'GET') {
    // Sample messages to return in GET request (in place of file storage)
    const messages = [
      { name: 'User1', message: 'Hello!' },
      { name: 'User2', message: 'Hi there!' }
    ];
    return {
      statusCode: 200,
      body: JSON.stringify({ items: messages }),
    };
  }

  if (event.httpMethod === 'POST') {
    const { name, message } = JSON.parse(event.body);

    // Basic validation
    if (!name || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and message are required.' }),
      };
    }

    // Ideally, here you can store messages somewhere (temporary solution here)
    // Sending back success response
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method Not Allowed' }),
  };
};
