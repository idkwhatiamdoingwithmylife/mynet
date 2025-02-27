// api.js

let message = "Waiting for message..."; // Default message

// Function to update the message on the HTML page
function updateMessage(msg) {
    document.getElementById('message').innerText = msg;
}

// Function to handle API requests
async function fetchMessage() {
    const response = await fetch('/api/message');
    if (response.ok) {
        const data = await response.json();
        updateMessage(data.message);
    }
}

// Call fetchMessage to update the message on page load
fetchMessage();

// Set up a simple server to handle incoming requests (if using Express or a similar framework)
self.addEventListener('fetch', event => {
    event.respondWith(
        (async () => {
            const req = event.request;
            if (req.method === 'POST' && req.url.endsWith('/api/message')) {
                const data = await req.json();
                message = data.message; // Update the message
                return new Response(JSON.stringify({ message }), { status: 200 });
            }
            // For GET requests, respond with the current message
            return new Response(JSON.stringify({ message }), { status: 200 });
        })()
    );
});
