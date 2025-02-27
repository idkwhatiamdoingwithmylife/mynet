let messages = [];

function addMessage(username, message) {
    if (username && message) {
        messages.push({ username, message });
        return true;
    }
    return false;
}

function getMessages() {
    return messages;
}

document.getElementById('sendButton').addEventListener('click', function() {
    const usernameInput = document.getElementById('usernameInput');
    const messageInput = document.getElementById('messageInput');
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username && message) {
        addMessage(username, message);
        messageInput.value = ''; // Clear input
        updateChat();
    } else {
        alert('Username and message cannot be empty or just spaces.');
    }
});

function updateChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = ''; // Clear previous messages
    const allMessages = getMessages();
    allMessages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<span class="username">${msg.username}:</span> ${msg.message}`;
        chatContainer.appendChild(messageElement);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
}
