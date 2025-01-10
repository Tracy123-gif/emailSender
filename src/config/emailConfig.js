import { createTransport } from 'nodemailer';
require('dotenv').config();

const transporter = createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default transporter;

