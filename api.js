// api.js
const express = require('express');
const router = express.Router();
const os = require('os');
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        // Get public IP using an external service
        const response = await axios.get('https://api.ipify.org?format=json');
        const publicIP = response.data.ip;

        res.json({ message: `Connected to ${publicIP}` });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch public IP' });
    }
});

module.exports = router;
