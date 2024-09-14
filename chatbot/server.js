const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const mode = req.body.mode; // Get the mode

    try {
        let prompt;
        if (mode === 'book') {
            prompt = `User is asking for book recommendations. Topic: "${userMessage}". Suggest relevant books.`;
        } else if (mode === 'recipe') {
            prompt = `User is asking for a food recipe. Dish: "${userMessage}". Provide the recipe.`;
        }

        const result = await model.generateContent(prompt);
        const reply = result.response.text().trim();
        res.json({ reply });
    } catch (error) {
        console.error('Error with Google Generative AI API:', error);
        res.status(500).send('Something went wrong!');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
