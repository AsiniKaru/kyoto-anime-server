import { Router } from 'express';
import {
  getAdminStats,
  getAdminUsers,
  updateUserRole,
  deleteUser,
  getAdminReviews,
} from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { requireDatabase } from '../middleware/requireDatabase.js';
import { validateBody } from '../middleware/validateMiddleware.js';
import { updateRoleSchema } from '../validators/admin.js';

const router = Router();

router.use(requireDatabase, protect, adminOnly);

router.get('/stats', getAdminStats);
router.get('/users', getAdminUsers);
router.patch('/users/:id/role', validateBody(updateRoleSchema), updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/reviews', getAdminReviews);

export default router;
