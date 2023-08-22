import express from "express";
import { followedUsers,unfollowedUsers } from '../controllers/rightbar.js'; 

const router = express.Router();

router.get('/followed', followedUsers);
router.get('/unfollowed', unfollowedUsers);

export default router;
