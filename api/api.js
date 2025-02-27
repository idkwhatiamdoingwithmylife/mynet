// api.js

// Function to update the message on the HTML page
function updateMessage(message) {
    document.getElementById('message').innerText = message;
}

// Fetch the message from the server
async function fetchMessage() {
    const response = await fetch('/.netlify/functions/message');
    if (response.ok) {
        const data = await response.json();
        updateMessage(data.message);
    }
}

// Call fetchMessage when the script loads
fetchMessage();
