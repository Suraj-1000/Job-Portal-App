const { Inquiry } = require('../models');

const contactController = {
    // Submit contact form inquiry
    submitInquiry: async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;

            // Validation
            if (!name || !email || !subject || !message) {
                return res.status(400).json({
                    message: 'All fields are required'
                });
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: 'Invalid email format'
                });
            }

            // Create inquiry
            const inquiry = await Inquiry.create({
                name: name.trim(),
                email: email.trim(),
                subject: subject.trim(),
                message: message.trim(),
                status: 'pending'
            });

            res.status(201).json({
                message: 'Your inquiry has been submitted successfully. We will get back to you soon.',
                inquiry: {
                    id: inquiry.id,
                    name: inquiry.name,
                    email: inquiry.email,
                    subject: inquiry.subject
                }
            });
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            res.status(500).json({
                message: 'Error submitting inquiry. Please try again later.',
                error: error.message
            });
        }
    }
};

module.exports = contactController;
