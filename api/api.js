module.exports = async (req, res) => {
  const message = req.query.message;

  if (message) {
    const parts = message.split(", ");
    if (parts.length === 2 && parts[0].startsWith('Visited:') && parts[1].startsWith('MAC:')) {
      const ipAddress = parts[0].split(": ")[1];
      const macAddress = parts[1].split(": ")[1];

      // Respond with the connected IP address and MAC address
      res.status(200).json({ message: `Connected to ${ipAddress}, MAC Address: ${macAddress}` });
    } else {
      res.status(400).json({ error: 'Invalid message format' });
    }
  } else {
    res.status(400).json({ error: 'No message provided' });
  }
};
