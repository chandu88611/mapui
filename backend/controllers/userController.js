import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Authenticate User and Generate Token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      status: true,
      message: 'Logged in successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(res, user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Register a New User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user', // Default role to 'user' if not provided
  });

  if (user) {
    res.status(201).json({
      status: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Logout User
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// Get Logged-In User's Profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      status: true,
      message: 'User profile fetched successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// List All Users (Admin only)
const listUsers = asyncHandler(async (req, res) => {
  const { search = "", role, page = 1, limit = 10 } = req.query;

  const query = {
    name: { $regex: search, $options: "i" },
  };

  if (role) {
    query.role = role;
  }

  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const [users, totalUsers] = await Promise.all([
    User.find(query).select("-password").skip(skip).limit(parseInt(limit)),
    User.countDocuments(query),
  ]);

  res.json({
    status: true,
    message: "Users fetched successfully",
    data: users,
    pagination: {
      total: totalUsers,
      page: parseInt(page),
      limit: parseInt(limit),
    },
  });
});


// Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      status: true,
      message: 'Profile updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update User Role (Admin only)
const updateUserRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;

  const user = await User.findById(userId);

  if (user) {
    user.role = role;
    await user.save();
    res.json({
      status: true,
      message: `User role updated to ${role}`,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Delete User (Admin only)
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (user) {
    await User.findOneAndDelete(userId);
    res.json({
      status: true,
      message: 'User deleted successfully',
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  listUsers,
  updateUserProfile,
  updateUserRole,
  deleteUser,
};
