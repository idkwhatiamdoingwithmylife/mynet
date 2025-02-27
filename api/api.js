let items = [];

function addItem(item) {
    if (item && item.length <= 1000) {
        items.push(item);
        return true;
    }
    return false;
}

function getItems() {
    return items;
}

document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const itemInput = document.getElementById('itemInput');
    const name = nameInput.value.trim() || 'Anonymous';
    const item = itemInput.value.trim();

    const message = `${name}: ${item}`;

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
    itemsToDisplay.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = item;
        itemList.appendChild(li);
    });
}
