const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// Sample book data (can be replaced with a database or an API)
const books = {
    "data structures": "Introduction to Algorithms by Thomas H. Cormen",
    "operating systems": "Operating System Concepts by Abraham Silberschatz",
    "database systems": "Database System Concepts by Abraham Silberschatz",
    "computer networks": "Computer Networking: A Top-Down Approach by Kurose and Ross",
    "machine learning": "Pattern Recognition and Machine Learning by Christopher M. Bishop",
    "artificial intelligence": "Artificial Intelligence: A Modern Approach by Stuart Russell",
    "web development": "Learning Web Design by Jennifer Niederst Robbins"
};

// POST route to handle user messages and provide book suggestions
app.post('/get-book-suggestion', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    let reply = "I'm not sure about that subject. Can you ask about Data Structures, Operating Systems, or other subjects?";

    // Look for books related to the subject in the user message
    for (let subject in books) {
        if (userMessage.includes(subject)) {
            reply = `For ${subject}, I recommend "${books[subject]}".`;
            break;
        }
    }

    res.json({ reply });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
