import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { getAnalytics } from '../controllers/analyticsController';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

router.get('/', requireAuth, asyncHandler(getAnalytics));

export default router;
