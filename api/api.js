const messageContainer = document.getElementById('messageContainer');
const messageInput = document.getElementById('messageInput');
const usernameInput = document.getElementById('usernameInput');

async function fetchMessages() {
    const response = await fetch('/.netlify/functions/chat');
    const data = await response.json();
    data.messages.forEach(msg => displayMessage(msg.username, msg.message));
}

async function sendMessage() {
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();
    if (username && message) {
        await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, message }),
        });
        displayMessage(username, message);
        messageInput.value = '';
    } else {
        alert('Both username and message are required!');
    }
}

function displayMessage(username, message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.textContent = `${username}: ${message}`;
    messageContainer.appendChild(div);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

document.getElementById('sendMessage').addEventListener('click', sendMessage);
fetchMessages();
