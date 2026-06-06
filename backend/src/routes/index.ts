import { Router } from 'express';
import auth from './auth';
import mood from './mood';
import journal from './journal';
import ai from './ai';
import analytics from './analytics';

const router = Router();

router.use('/auth', auth);
router.use('/mood', mood);
router.use('/journal', journal);
router.use('/ai', ai);
router.use('/analytics', analytics);

export default router;
