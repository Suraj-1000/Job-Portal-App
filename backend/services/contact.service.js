const BaseService = require("@/services/BaseService");
const inquiryRepository = require("@/repositories/inquiry.repository");

class ContactService extends BaseService {
    constructor() {
        super(inquiryRepository);
    }

    async submitInquiry(data) {
        const { name, email, subject, message } = data;

        if (!name || !email || !subject || !message) {
            throw new Error('All fields are required');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        const inquiry = await this.repository.create({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
            status: 'pending'
        });

        return {
            message: 'Your inquiry has been submitted successfully. We will get back to you soon.',
            inquiry: {
                id: inquiry.id,
                name: inquiry.name,
                email: inquiry.email,
                subject: inquiry.subject
            }
        };
    }
}

module.exports = new ContactService();
