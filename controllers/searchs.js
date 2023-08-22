import { db } from '../index.js';

export const searchUsers = (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "get all user fail", details: err });
    }
    
    return res.status(200).json(data);
  });
};
