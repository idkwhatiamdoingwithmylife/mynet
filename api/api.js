module.exports = async (req, res) => {
  const encodedMessage = req.query.message;

  if (encodedMessage) {
    try {
      const decodedMessage = atob(encodedMessage);
      const messageParts = decodedMessage.split(": ");
      
      if (decodedMessage.includes('Visited:')) {
        const fullUrl = messageParts[1];
        
        // Respond with the connected IP address
        res.status(200).json({ message: `Connected to ${fullUrl}` });
      } else {
        res.status(400).json({ error: 'Invalid message format' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to decode Base64 message' });
    }
  } else {
    res.status(400).json({ error: 'No message provided' });
  }
};
