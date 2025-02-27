module.exports = async (req, res) => {
  const message = req.query.message;

  if (message) {
    if (message.startsWith('Visited:')) {
      const fullUrl = message.split(": ")[1];
      
      // Respond with the connected IP address
      res.status(200).json({ message: `Connected to ${fullUrl}` });
    } else {
      res.status(400).json({ error: 'Invalid message format' });
    }
  } else {
    res.status(400).json({ error: 'No message provided' });
  }
};
