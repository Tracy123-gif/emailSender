import express from 'express';
import transporter from '../config/emailConfig.js'; // Import email configuration
import contactValidation from '../middleware/contactValidation.js'; // Import validation middleware

const router = express.Router();

router.post('/send-message', contactValidation, async (req, res) => {
    const { fullName, email, message } = req.body;

    try {
        const htmlContent = `
        <div>
            <h2>Message from pushtoprofit.com</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message.replace(/\n/g, '<br>')}</p>
        </div>
    `;
        await transporter.sendMail({
            from: `"${fullName}" <${email}>`,
            to: process.env.EMAIL_RECEIVER, // Set receiver's email in .env
            subject: `New Contact Form Submission from ${fullName}`,
            text: message,
            html: htmlContent, // Beautified HTML
        });

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

export default router; // Export the router
