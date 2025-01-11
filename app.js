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
// const FRONTEND_URL = process.env.FRONTEND_PRODUCTION_URL || 'http://localhost:5173';


const allowedOrigins = ['https://pushtoprofit.vercel.app', 'http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins, // Allow specific origins
    methods: ['GET', 'POST', 'OPTIONS'], // Allow these HTTP methods
    credentials: true, // Allow credentials (if needed)
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
