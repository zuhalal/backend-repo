import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import { fetchUserData, register, updateUserData } from '../controller/api';
declare module 'express' {
  interface Request {
    user?: any;
  }
}

const router = express.Router()

router.post('/register', register) 
router.post('/update-user-data', authenticateUser, updateUserData)
router.get('/fetch-user-data', authenticateUser, fetchUserData);

export default router;