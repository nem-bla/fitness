import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Point to .env file
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/', async (req, res) => {
    res.send('Hello from the backend')
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});