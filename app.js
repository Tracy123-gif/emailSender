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
const PORT = process.env.PORT || 5000; // Set default port to 5000 if not in .env

const frontendURL = process.env.FRONTEND_PRODUCTION_URL;

// const allowedOrigins = [frontendURL, 'http://localhost:5173'];

// Middleware: Enable CORS
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true); // Allow the request
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods
//     credentials: true, // Allow cookies if needed
//   })
// );
app.use(cors())



// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/contact', contactRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


export default app;
