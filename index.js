import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import storiesRoutes from './routes/stories.js';
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import searchuserRoutes from './routes/search.js'
import rightbarRoutes from './routes/rightbarroute.js'
import multer from 'multer';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(cookieParser());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// MYSQL CONNECTION
export const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port:3306,
  password: "karthi@123",
  database: "social",
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('MySQL connected successfully!');
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/searchusers", searchuserRoutes);
app.use("/api/rightbar", rightbarRoutes);

app.listen(process.env.PORT || 8800, () => {
  console.log('Backend is running on port 8800');
});
