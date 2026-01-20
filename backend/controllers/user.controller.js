const { User } = require('@/models'); // will use models/index.js magic
const asyncHandler = require('@/middlewares/asyncHandler');

// GET /users          → get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }, // optional: clean response
  });
  res.status(200).json(users);
});

// GET /users/:id      → get one user
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});

// POST /users         → create user
const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check required fields
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('firstName, lastName, email and password are required');
  }

  // Hash the password - NEVER store plain text!
  const bcrypt = require('bcryptjs');
  const saltRounds = 10;                    // 10-12 is good balance of security & speed
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user with HASHED password
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,              // ← important: save hash, not plain password
  });

  // Optional: remove password from response (security best practice)
  const userResponse = newUser.toJSON();
  delete userResponse.password;

  res.status(201).json(userResponse);
});

// PATCH /users/:id    → update user (partial update)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Only update provided fields
  const updates = { ...req.body };

  // Hash password if it's being updated
  if (updates.password) {
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    updates.password = await bcrypt.hash(updates.password, saltRounds);
  }

  await user.update(updates);

  // Remove password from response
  const userResponse = user.toJSON();
  delete userResponse.password;

  res.status(200).json(userResponse);
});

// DELETE /users/:id   → delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.destroy();
  res.status(204).send(); // 204 = No Content → successful deletion
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};