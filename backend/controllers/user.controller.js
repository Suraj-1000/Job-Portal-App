const { User } = require('../models'); // will use models/index.js magic

// GET /users          → get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // optional: clean response
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// GET /users/:id      → get one user
async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// POST /users         → create user
async function createUser(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: 'firstName, lastName, email and password are required'
      });
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
  } catch (error) {
    console.error('Create user error:', error);

    // Handle duplicate email (unique constraint)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Email already in use' });
    }

    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
}

// PATCH /users/:id    → update user (partial update)
async function updateUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// DELETE /users/:id   → delete user
async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(204).send(); // 204 = No Content → successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};