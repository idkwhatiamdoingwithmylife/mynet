let items = [];

function addItem(item) {
    if (item && !items.includes(item)) {
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
    const itemInput = document.getElementById('itemInput');
    const item = itemInput.value.trim();

    if (addItem(item)) {
        itemInput.value = '';
        displayItems();
    } else {
        alert('Item already exists or is invalid.');
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
