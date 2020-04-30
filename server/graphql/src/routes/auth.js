import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../config';
import environment from '../environment';

import User from '../models/user';

export default app => {
  
  if (!environment.prod) {
    app.post('/server/api/auth/register', (req, response) => {
      
      const args = req.body;
      User.create({
        username: args.username
      }).then(user => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(args.password, salt, (err, hash) => {

            if (err) throw err;
            user.password = hash;
            user.save()
              .then(user => response.json(user));
          });
        });
      });
    });
  }

  const signJwtToken = (userId, username, callback) => {
  
    const payload = {
      id: userId,
      username: username
    };
    // Sign token
    jwt.sign(
      payload,
      config.jwtSecret, {
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
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            signJwtToken(user._id, user.username, (err, token) => {
              res.json({
                success: true,
                token: token
              });
        
              user.lastLogin = Date.now();
              user.save();
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