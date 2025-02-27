let items = [];

// Function to add an item
function addItem(item) {
    if (item && !items.includes(item)) {
        items.push(item);
        return true;
    }
    return false;
}

// Function to get all items
function getItems() {
    return items;
}

// Event listener for form submission
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

// Function to display items
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
