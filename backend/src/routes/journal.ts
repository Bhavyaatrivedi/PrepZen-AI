import { Router } from 'express';
import { createJournal, getJournalHistory } from '../controllers/journalController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.post('/', requireAuth, createJournal);
router.get('/history', requireAuth, getJournalHistory);

export default router;
