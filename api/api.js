async function fetchMessages() {
    const response = await fetch('/.netlify/functions/chat');
    const data = await response.json();
    displayMessages(data.messages);
}

function displayMessages(messages) {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = '';
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = `${msg.username}: ${msg.text}`;
        chatContainer.appendChild(messageDiv);
    });
}

async function sendMessage() {
    const username = document.getElementById('username').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!username || !message) {
        alert('Username and message cannot be empty.');
        return;
    }

    const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, text: message })
    });

    if (response.ok) {
        document.getElementById('message').value = '';
        fetchMessages();
    }
}

fetchMessages();
setInterval(fetchMessages, 3000);
