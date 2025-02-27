module.exports = async (req, res) => {
    const deviceName = req.query.deviceName;

    if (deviceName) {
        res.status(200).json({ deviceName });
    } else {
        res.status(400).json({ error: 'No device name provided' });
    }
};
