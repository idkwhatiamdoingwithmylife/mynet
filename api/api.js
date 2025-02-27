const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let connectedComputer = 'Not connected';

app.post('/api', (req, res) => {
    connectedComputer = req.body.computerName || 'Unknown';
    res.json({ message: `connected to ${connectedComputer}` });
});

// Endpoint to retrieve the connected computer name
app.get('/api/name', (req, res) => {
    res.json({ message: `connected to ${connectedComputer}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
