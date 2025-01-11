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

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// CORS Configuration
app.use(
  cors({
    origin: FRONTEND_URL, // Restrict to frontend domain
    methods: ['GET', 'POST', 'OPTIONS'], // Allow necessary HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/contact', contactRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
});

export default app;
