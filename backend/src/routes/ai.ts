import { Router } from 'express';
import { analyzeJournal, chatWithCoach } from '../controllers/aiController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.post('/analyze', requireAuth, analyzeJournal);
router.post('/chat', requireAuth, chatWithCoach);

export default router;
