import express from 'express';
import pkg from 'body-parser';
import contactRoute from './src/routes/contact.js';  // Make sure this path is correct

const { json } = pkg;  // Correct way to import body-parser's json method

const app = express();

// Use bodyParser to parse JSON requests
app.use(json());

// Use the contact route
app.use('/contact', contactRoute);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
