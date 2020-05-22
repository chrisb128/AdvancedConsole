import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';

export default (app, passport) => {

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
  
  app.use('/server/api/auth/user', (req, res) => {
    
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        res.status(200).json({ success: false, error: err });
        return;
      }

      if (user) {
        signJwtToken(user._id, user.username, (err, token) => {
          if (err) {
            console.log('Login fail, could not sign token');
            return res.status(200).json({ success: false, error: err });
          }

          return res.status(200).json({ 
            userId: user._id,
            username: user.username,
            success: true,
            token
          });
        });
      } else {
        return res.status(200).json({ success: false, error: 'User is not valid' });
      }
    })(req, res);
  })

  app.post('/server/api/auth/login', (req, res) => {
    const { userName, password } = req.body;

    User.findOne({ username: userName })
      .then((user => {
        if (!user) {
          console.log('Login fail, user not found');
          return res
            .status(400)
            .json({ success: false, reason: "Username or password incorrect" });
        }

        return bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            signJwtToken(user._id, user.username, (err, token) => {
              if (err) {
                console.log('Login fail, could not sign token');
                return res
                  .status(400)
                  .json({ success: false, reason: "Username or password incorrect" });
              }

              console.log(`Login success: ${user.username}`);
              console.log(`Generated session token: ${token}`);
              user.lastLogin = Date.now();
              user.save();

              res.cookie('jwt', token, { httpOnly: true });

              return res
                .json({
                  userId: user._id,
                  username: user.username,
                  success: true,
                  token: token
                });
            });
          } else {
            console.log('Login fail, password mismatch');
            return res
              .status(400)
              .json({ success: false, reason: "Username or password incorrect" });
          }
        });
      }));
  });

  app.use('/server/api/auth/logout', (req, res) => {
    res.clearCookie('jwt');
    return res.status(200).json({});
  });
};