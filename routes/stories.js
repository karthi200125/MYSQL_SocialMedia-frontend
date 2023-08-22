import express from "express";
import { getStories,addStories} from "../controllers/story.js";

const router = express.Router();

router.get("/", getStories);
router.post("/add", addStories);
// router.delete("/:id", deleteStory);

export default router;
