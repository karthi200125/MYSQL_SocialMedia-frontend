import express from 'express';
import { searchUsers } from '../controllers/searchs.js'; 

const router = express.Router();

router.get('/allusers', searchUsers); 

export default router;
