import { Router } from 'express';
import { createMood, getMoodHistory } from '../controllers/moodController';
import { requireAuth } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { asyncHandler } from '../middlewares/asyncHandler';
import { moodEntrySchema } from '../validators/moodValidator';

const router = Router();

router.post('/', requireAuth, validateRequest(moodEntrySchema), asyncHandler(createMood));
router.get('/history', requireAuth, asyncHandler(getMoodHistory));

export default router;
