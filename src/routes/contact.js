import { Router } from 'express';
import { createTransport } from 'nodemailer';
import contactValidation from '../middleware/contactValidation.js'; // Adjust path if necessary
const router = Router();

// Use the contact validation middleware
router.post('/send-message', contactValidation, async (req, res) => {
    const { fullName, email, message } = req.body;

    try {
        // Create a transporter object for sending emails
        const transporter = createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Using environment variable
                pass: process.env.EMAIL_PASS,
            },
        });

        // Create the email content with HTML for better styling
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #4CAF50;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee;">
                    ${message.replace(/\n/g, '<br>')} <!-- Replace line breaks with HTML breaks -->
                </div>
                <p style="margin-top: 20px; font-size: 0.9em; color: #666;">This email was sent from your contact form.</p>
            </div>
        `; // Your HTML content remains the same

        // Send the email with beautified HTML content
        await transporter.sendMail({
            from: `"${fullName}" <${email}>`,
            to: 'your-email@example.com',
            subject: `Contact Form Message from ${fullName}`,
            text: message,
            html: htmlContent,
        });

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

export default router;
