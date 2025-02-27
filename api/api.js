import express from "express";

const app = express();
app.use(express.json());

let latestMessage = "";
let isPythonRunning = false; // New variable to track Python script status

// Endpoint to handle incoming messages and running status
app.post("/api/message", (req, res) => {
    const { message, is_running } = req.body; // Accept is_running from the Python script
    if (message) {
        latestMessage = message;
    }
    if (is_running !== undefined) {
        isPythonRunning = is_running; // Update the running status
    }
    res.json({ success: true });
});

// Endpoint to fetch the latest message and running status
app.get("/api/message", (req, res) => {
    res.json({ message: latestMessage, connected: true, pythonRunning: isPythonRunning });
});

// Export the app for serverless deployment
export default app;
