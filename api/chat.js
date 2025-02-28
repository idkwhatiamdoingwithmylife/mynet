// Handles chat functionality, API interactions, and updates for the message list

async function fetchItems() {
    try {
        const response = await fetch('/.netlify/functions/chat');
        const data = await response.json();
        displayItems(data.items);
    } catch (err) {
        console.error("Error fetching items:", err);
    }
}

function displayItems(items) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';  // Clear existing items
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        itemList.appendChild(li);
    });
    itemList.scrollTop = itemList.scrollHeight;  // Scroll to the bottom
}

document.querySelector('.input-container button').addEventListener('click', async function(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('nameInput');
    const itemInput = document.getElementById('itemInput');
    const name = nameInput.value.trim();
    const item = itemInput.value.trim();

    if (!name || !item) {
        alert('Username and message cannot be blank or just spaces.');
        return;
    }

    const message = `${name}: ${item}`;

    try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: message })
        });

        const data = await response.json();
        if (data.success) {
            itemInput.value = '';
            fetchItems(); // Refresh the message list
        } else {
            alert('Message is invalid.');
        }
    } catch (err) {
        console.error("Error sending message:", err);
    }
});

// Fetch existing messages on page load
fetchItems();
