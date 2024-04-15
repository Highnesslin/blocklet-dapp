import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import { editUser, getUserInfo, login } from './user';
import authMiddle from '../middleware/auth';

const router = Router();

router.use('/user', middleware.user(), getUserInfo);
router.post('/login', middleware.user(), login);
router.post('/editUser', middleware.user(), authMiddle, editUser);

export default router;
