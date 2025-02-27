async function sendMessageToAPI() {
    const apiUrl = 'https://funny-marigold-5eed7d.netlify.app/api/api.js';
    const macName = "YourMacBookName"; // Replace with the actual MacBook's name

    try {
        const response = await fetch(`${apiUrl}?message=${macName}`);
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('connection-status').innerText = `Connected to ${data.message}`;
        } else {
            console.error('Request Failed:', data.error);
        }
    } catch (error) {
        console.error('Request Error:', error);
    }
}

sendMessageToAPI();
