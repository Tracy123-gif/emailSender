import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './src/routes/contact.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment Variables
const FRONTEND_URL = process.env.FRONTEND_PRODUCTION_URL || 'http://localhost:5173';

// Allowed Origins for CORS
const allowedOrigins = [FRONTEND_URL, 'http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins, // Allow requests from these origins
    methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/contact', contactRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed Origins:`, allowedOrigins);
});

export default app;
