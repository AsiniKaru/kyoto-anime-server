import { Router } from 'express';
import {
  register,
  login,
  refresh,
  logout,
  getMe,
  updateProfile,
  updatePassword,
  deleteAccount,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireDatabase } from '../middleware/requireDatabase.js';
import { authLimiter } from '../middleware/rateLimitMiddleware.js';
import { validateBody } from '../middleware/validateMiddleware.js';
import {
  changePasswordSchema,
  deleteAccountSchema,
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from '../validators/auth.js';

const router = Router();

router.use(requireDatabase);

router.post('/register', authLimiter, validateBody(registerSchema), register);
router.post('/login', authLimiter, validateBody(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);

router.use(protect);
router.get('/me', getMe);
router.patch('/profile', validateBody(updateProfileSchema), updateProfile);
router.patch('/password', authLimiter, validateBody(changePasswordSchema), updatePassword);
router.delete('/account', validateBody(deleteAccountSchema), deleteAccount);

export default router;
