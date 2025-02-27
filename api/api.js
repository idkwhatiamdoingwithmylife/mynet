<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Send Message</title>
</head>
<body>
    <input type="text" id="message" placeholder="Type your message">
    <button onclick="sendMessage()">Send</button>
    <div id="status">Checking connection...</div>

    <script>
        async function sendMessage() {
            const message = document.getElementById("message").value;
            if (!message) return alert("Please enter a message.");

            const response = await fetch("https://funny-marigold-5eed7d.netlify.app/api/api.js", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            if (response.ok) {
                alert("Message sent!");
            } else {
                alert("Failed to send message.");
            }
        }

        async function checkConnection() {
            try {
                const response = await fetch("https://funny-marigold-5eed7d.netlify.app/api/api.js");
                const statusDiv = document.getElementById("status");
                if (response.ok) {
                    statusDiv.innerText = "API is connected.";
                } else {
                    statusDiv.innerText = "API is not connected.";
                }
            } catch (error) {
                const statusDiv = document.getElementById("status");
                statusDiv.innerText = "API is not connected.";
            }
        }

        window.onload = checkConnection;
    </script>
</body>
</html>
