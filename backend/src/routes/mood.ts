import { Router } from 'express';
import { createMood, getMoodHistory } from '../controllers/moodController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.post('/', requireAuth, createMood);
router.get('/history', requireAuth, getMoodHistory);

export default router;
