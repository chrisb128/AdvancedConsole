import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import environment from '../environment';

import User from '../models/user';

export default app => {
  
  const signJwtToken = (userId, username, callback) => {
  
    const payload = {
      id: userId,
      username: username
    };
    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET, {
        expiresIn: 31556926 // 1 year in seconds
      },
      (err, token) => {
        callback(err, token);
      }
    );
  };

  app.post('/server/api/auth/login', (req, res) => {
    const { userName, password } = req.body;

    User.findOne({ username: userName })
      .then((user => {
        if (!user) {
          return res
            .status(400)
            .json({ success: false, reason: "Username or password incorrect" });
        }

        return bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            signJwtToken(user._id, user.username, (err, token) => {
        
              user.lastLogin = Date.now();
              user.save();
              
              return res.json({
                success: true,
                token: token
              });
            });
          } else {
            return res
              .status(400)
              .json({ success: false, reason: "Username or password incorrect" });
          }
        })

      }));
  });
};