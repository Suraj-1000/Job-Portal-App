const contactService = require('@/services/contact.service');
const asyncHandler = require('@/middlewares/asyncHandler');

const contactController = {
    // Submit contact form inquiry
    submitInquiry: asyncHandler(async (req, res) => {
        const result = await contactService.submitInquiry(req.body);
        res.status(201).json(result);
    })
};

module.exports = contactController;
