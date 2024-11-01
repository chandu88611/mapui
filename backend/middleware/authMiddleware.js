import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config(); 
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Check if the token is in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];
      console.log(token)

      // Verify the token
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
       console.log(decoded.userId)
      // Attach the user to the request object, excluding the password
      req.user = await User.findById(decoded.userId).select('-password');
      console.log(decoded.userId)
    
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};
const authorizeManagerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {
    next(); // User is authorized
  } else {
    res.status(403).json({ message: 'Access denied. Managers or Admins only.' });
  }
};

export { protect,authorizeAdmin ,authorizeManagerOrAdmin};
