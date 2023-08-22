import { db } from '../index.js';


export const followedUsers = (req, res) => {
  const userId = req.header('X-User-ID');
  const q = `select * from users as u join relationships as r on u.id=r.followedUserId where r.followerUserId=${userId} LIMIT 3`;

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const unfollowedUsers = (req, res) => {
  const userId = req.header('X-User-ID');    
    const q=`SELECT u.id, u.username, u.profilePic
    FROM users AS u
    WHERE u.id != ${userId}
    AND u.id NOT IN (
      SELECT r.followedUserId
      FROM relationships AS r
      WHERE r.followerUserId = ${userId})    
    `
  
    db.query(q, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(data);
    });
  };
  