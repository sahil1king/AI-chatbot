const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIApi, Configuration } = require('openai'); // Fix: Correct import statement

// Initialize Express and body-parser
const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

// Configure OpenAI API with your key
const configuration = new Configuration({
    apiKey: '',  // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

// Endpoint to handle chatbot interaction
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;  // Get user's message from frontend

    try {
        // Call OpenAI to get a response based on the user's message
        const response = await openai.createCompletion({
            model: "text-davinci-003",  // Model type; you can use other models like GPT-4 if available
            prompt: generatePrompt(userMessage),  // The prompt is dynamically generated
            max_tokens: 100,  // Set the response length limit
            temperature: 0.7,  // Controls creativity in the response
        });

        const reply = response.data.choices[0].text.trim();  // Get the text reply from OpenAI response
        res.json({ reply });  // Send the reply back to the frontend
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).send('Something went wrong!');  // Handle errors
    }
});

// Function to generate a prompt based on the user's message
function generatePrompt(message) {
    return `The student is asking for book recommendations. They said: "${message}". Suggest relevant books for a B.Tech Computer Science course.`;
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
