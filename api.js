let wheatWords = [];

// Function to add a wheat word
function addWheatWord(word) {
    if (word && !wheatWords.includes(word)) {
        wheatWords.push(word);
        return true;
    }
    return false;
}

// Function to get all wheat words
function getWheatWords() {
    return wheatWords;
}

// Event listener for form submission
document.getElementById('wheatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const wheatWordInput = document.getElementById('wheatWord');
    const word = wheatWordInput.value.trim();

    if (addWheatWord(word)) {
        wheatWordInput.value = '';
        displayWheatWords();
    } else {
        alert('Word already exists or is invalid.');
    }
});

// Function to display wheat words
function displayWheatWords() {
    const wheatList = document.getElementById('wheatList');
    wheatList.innerHTML = '';
    const words = getWheatWords();
    words.forEach(function(word) {
        const li = document.createElement('li');
        li.textContent = word;
        wheatList.appendChild(li);
    });
}
