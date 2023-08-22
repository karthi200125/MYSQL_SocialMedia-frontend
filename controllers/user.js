import { db } from "../index.js";
import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {

  const userId=req.params.userId;
  console.log("from oarams userid",userId)
  const token = req.cookies.accessToken;   
  if (!token) {
    return res.status(401).json("Not logged in!");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
      
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
})
}

export const updateUser = (req, res) => {
  const userId = req.header('X-User-ID');
console.log("from userid",userId)

  const q = "UPDATE users SET `username` = ?, `city` = ?, `profilePic` = ?, `coverPic` = ? WHERE id = ?";

  db.query(
    q,
    [      
      req.body.username,
      req.body.city,
      req.body.profilePic,
      req.body.coverPic,
      userId,
    ],
    (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.affectedRows > 0) {
        return res.json("Updated");
      } else {
        return res.status(403).json("You can only update your own account");
      }
    }
  );
};
