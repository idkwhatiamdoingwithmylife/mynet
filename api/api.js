// api.js

// Function to update the message on the HTML page
function updateMessage(message) {
    document.getElementById('message').innerText = message;
}

// Simulate receiving a message from the Python script
async function fetchMessage() {
    const response = await fetch('https://funny-marigold-5eed7d.netlify.app/api/message'); // Update with your API endpoint
    if (response.ok) {
        const data = await response.json();
        updateMessage(data.message);
    }
}

// Call fetchMessage when the script loads
fetchMessage();
