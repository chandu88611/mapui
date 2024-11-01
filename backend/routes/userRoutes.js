import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  listUsers,
  updateUserProfile,
  updateUserRole,
  deleteUser,
} from '../controllers/userController.js';
import { authorizeAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.route('/').get(protect,authorizeAdmin,  listUsers);
router.route('/:userId').delete(protect, authorizeAdmin, deleteUser);
router.put('/role', protect,  updateUserRole);

export default router;
