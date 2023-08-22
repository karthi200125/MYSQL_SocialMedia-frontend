import { db } from "../index.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import multer from "multer"; 

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const getStories = (req, res) => {
  const userId = req.header('X-User-ID'); 

  const q = `
    SELECT s.*, u.username 
    FROM stories AS s 
    JOIN users AS u ON (u.id = s.userId)
    JOIN relationships AS r ON (s.userId = r.FollowedUserId AND r.followerUserId = ${userId}) 
    LIMIT 4`;
  

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addStories = (req, res) => {
  jwt.verify("secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const q = "INSERT INTO stories(`img`, `userId`) VALUES (?, ?)";
    

    db.query(q, [req.body.img,userInfo.id], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json("Story with image has been added.");
    });
  });
};