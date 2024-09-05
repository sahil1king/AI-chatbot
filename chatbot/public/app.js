document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== '') {
        displayMessage(userInput, 'user-message');
        document.getElementById('userInput').value = ''; // Clear input field

        // Send user input to the backend and get a response
        fetch('/get-book-suggestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            displayMessage(data.reply, 'bot-message');
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('Sorry, something went wrong.', 'bot-message');
        });
    }
}

function displayMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(className);
    const messagePara = document.createElement('p');
    messagePara.innerText = text;
    messageDiv.appendChild(messagePara);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}
// Send request to the backend API when the user sends a message
fetch('/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userInput }),  // Pass user's input
})
.then(response => response.json())
.then(data => {
    displayMessage(data.reply, 'bot-message');  // Display the bot's response
})
.catch(error => {
    console.error('Error:', error);
});

