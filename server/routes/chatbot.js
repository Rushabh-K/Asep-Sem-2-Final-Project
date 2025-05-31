const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const auth = require('../middleware/auth');

// Initialize OpenAI configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route to handle chatbot interactions
router.post('/chat', auth, async (req, res) => {
    try {
        const { message } = req.body;

        // Check if OpenAI API key is configured
        if (!process.env.OPENAI_API_KEY) {
            console.error('OpenAI API key is not configured');
            return res.status(500).json({ 
                error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env file.' 
            });
        }

        // Validate message
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ 
                error: 'Invalid message format. Message must be a non-empty string.' 
            });
        }
        
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: `You are FoodLink Assistant, a helpful assistant for FoodLink, a platform that connects food donors with organizations that help feed the hungry. 
                You help users find information about:
                - How to donate food
                - Finding nearby NGOs
                - Volunteering opportunities
                - Food safety guidelines
                - Platform features and navigation
                Keep responses concise, friendly, and focused on food donation and NGO-related topics.
                Always refer to yourself as "FoodLink Assistant" or just "I" when responding.`
            }, {
                role: "user",
                content: message
            }],
            max_tokens: 150,
            temperature: 0.7
        });

        if (!completion.data || !completion.data.choices || !completion.data.choices[0]) {
            console.error('Invalid response from OpenAI:', completion);
            return res.status(500).json({ 
                error: 'Failed to get a valid response from AI service.' 
            });
        }

        res.json({
            response: completion.data.choices[0].message.content
        });
    } catch (error) {
        console.error('Chatbot error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        
        // Send more specific error messages
        if (error.response?.status === 401) {
            res.status(401).json({ 
                error: 'Invalid OpenAI API key. Please check your configuration.' 
            });
        } else if (error.response?.status === 429) {
            res.status(429).json({ 
                error: 'Rate limit exceeded. Please try again later.' 
            });
        } else {
            res.status(500).json({ 
                error: 'Failed to process chat request. Please try again.' 
            });
        }
    }
});

module.exports = router; 