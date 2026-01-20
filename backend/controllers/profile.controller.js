const { User } = require('@/models');
const asyncHandler = require('@/middlewares/asyncHandler');

const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
    });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json(user);
});

module.exports = {
    getProfile
};
