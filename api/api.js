module.exports = async (req, res) => {
    const encodedMessage = req.query.message;

    if (encodedMessage) {
        const deviceName = encodedMessage.split(': ')[1];
        res.status(200).json({ message: deviceName });
    } else {
        res.status(400).json({ error: 'No message provided' });
    }
};
