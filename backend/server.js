import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import OpenAI from 'openai';
import { writeFile, readFile } from 'fs/promises';

const openai = new OpenAI();

// remember to start with nodemon --ignore db.json server.js

// Point to .env file
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 8000;

let messageData = { messages:[] };

async function gptMessage(message) {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a fitness AI." },
            { role: "user", content: message }
        ],
        model: "gpt-3.5-turbo",
    });

    const reply = completion.choices[0].message.content;

    console.log(reply);
    return reply; // Return the reply
}



async function chatGptMessage() {
    try {
      // Read data from db.json
      const data = await readFile('db.json', 'utf-8');
      const parsedData = JSON.parse(data);
  
      // Extract messages array (handle empty array case)
      const messages = parsedData.messages || [];

        const latestMessage = messages[messages.length - 1];

      console.log(latestMessage.message);
      gptMessage(latestMessage.message);
  
      // Return the latest message (if any)
      return messages.length > 0 ? latestMessage : null;
    } catch (err) {
      console.error('Error reading db.json:', err);
      return null; // Return null on error
    }
  }
  

// Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json()); // parse JSON bodies

app.get('/', async (req, res) => {
    res.send('Hello from the backend');
});

app.post('/api/message', async (req, res) => {
    const message = req.body.message; // Extract the message
  
    try {
        // Read existing data from db.json (if it exists)
        try {
            const data = await readFile('db.json', 'utf-8');
            messageData = JSON.parse(data); // Update messageData object
        } catch (err) {
            console.log('db.json not found, creating new one');
        }

        // Generate a unique (sequential) message ID
        const messageId = messageData.messageIdCounter++;

        // Add the message with ID to the messages array
        messageData.messages.push({ id: messageId, message });

        // Stringify the updated data
        const updatedData = JSON.stringify(messageData, null, 2); // Add indentation for readability (optional)

        // Write the updated data back to db.json
        await writeFile('db.json', updatedData);

        console.log('Message stored successfully');

        // Get the GPT-3 reply
        const gptReply = await gptMessage(message);

        res.json({ message: gptReply }); // Send GPT-3 reply to the frontend
    } catch (err) {
        console.error(err);
        res.status(500).send('Error storing message');
    }
});

  
  


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
