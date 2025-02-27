const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let connectedComputer = 'Not connected';

app.get('/api', (req, res) => {
    res.json({ message: `connected to ${connectedComputer}` });
});

// Endpoint to set the connected computer name (add this)
app.post('/api/connect', (req, res) => {
    connectedComputer = req.body.computerName || 'Unknown';
    res.json({ message: `Computer name updated to ${connectedComputer}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
