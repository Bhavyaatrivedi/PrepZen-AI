import { Router } from 'express';
import { createJournal, getJournalHistory } from '../controllers/journalController';
import { requireAuth } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { asyncHandler } from '../middlewares/asyncHandler';
import { journalEntrySchema } from '../validators/journalValidator';

const router = Router();

router.post('/', requireAuth, validateRequest(journalEntrySchema), asyncHandler(createJournal));
router.get('/history', requireAuth, asyncHandler(getJournalHistory));

export default router;
