// chat.js - Handles frontend interaction with the API

const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messages');

// Fetch and display messages from the API
const loadMessages = async () => {
    try {
        const response = await fetch('/.netlify/functions/api');
        const data = await response.json();
        messagesContainer.innerHTML = data.map(msg => `<div class="message">${msg}</div>`).join('');
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
};

// Send a message to the API
const sendMessage = async () => {
    const message = messageInput.value.trim();
    if (message) {
        try {
            await fetch('/.netlify/functions/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            messageInput.value = ''; // Clear the input
            loadMessages(); // Refresh the message list
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
};

// Initialize and load messages every 3 seconds
loadMessages();
setInterval(loadMessages, 3000);
