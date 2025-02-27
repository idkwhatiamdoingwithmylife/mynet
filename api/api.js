let items = [];

function addItem(message) {
    if (message && message.text.length <= 1000) {
        items.push(message);
        return true;
    }
    return false;
}

function getItems() {
    return items;
}

function deleteItem(index) {
    if (index >= 0 && index < items.length) {
        items.splice(index, 1);
        return true;
    }
    return false;
}

document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const itemInput = document.getElementById('itemInput');
    const name = nameInput.value.trim() || 'Anonymous';
    const item = itemInput.value.trim();

    const message = { name, text: item };

    if (addItem(message)) {
        itemInput.value = '';
        displayItems();
    } else {
        alert('Message is invalid.');
    }
});

function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    const itemsToDisplay = getItems();
    itemsToDisplay.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name}: ${item.text}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => {
            deleteItem(index);
            displayItems();
        };
        li.appendChild(deleteButton);
        itemList.appendChild(li);
    });
}
