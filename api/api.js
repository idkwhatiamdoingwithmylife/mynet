import express from "express";

const app = express();
app.use(express.json());

let latestMessage = "";

// Endpoint to handle incoming messages
app.post("/api/message", (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    latestMessage = message;
    res.json({ success: true });
});

// Endpoint to fetch the latest message
app.get("/api/message", (req, res) => {
    res.json({ message: latestMessage, connected: true });
});

// Export the app for serverless deployment
export default app;
