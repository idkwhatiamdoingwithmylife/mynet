const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let connectionStatus = { message: "Computer disconnected" };

app.post('/api/connect', (req, res) => {
    const { computer_name, public_ip } = req.body;
    connectionStatus = { message: `Hi, ${computer_name} connected! Your IP is ${public_ip}` };
    res.json(connectionStatus);
});

app.get('/api/status', (req, res) => {
    res.json(connectionStatus);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
