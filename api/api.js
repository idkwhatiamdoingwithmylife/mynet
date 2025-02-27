module.exports = async (req, res) => {
    const encodedMessage = req.query.message;

    let htmlResponse = '<h1>Connection Status</h1><div id="status">Not Connected</div>';

    if (encodedMessage) {
        const deviceName = encodedMessage.split(': ')[1];
        htmlResponse = `<h1>Connection Status</h1><div id="status">Connected to: ${deviceName}</div>`;
    }

    res.status(200).send(htmlResponse);
};
