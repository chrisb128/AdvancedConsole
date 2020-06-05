import { signJwtToken, tokenExpiration, checkPasswordMatch } from '../services/auth';

import User from '../models/user';

export default (app, passport) => {
  
  app.use('/server/api/auth/user', (req, res) => {
    
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) {
        res.status(200).json({ success: false, error: err });
        return;
      }

      if (!user) {
        res.status(200).json({ success: false, error: 'User not logged in' });
        return;
      }
      
      const sessionToken = await signJwtToken(user._id, user.username, tokenExpiration.session);
      res.cookie('jwt', sessionToken.token, { httpOnly: true });

      const apiToken = await signJwtToken(user._id, user.username, tokenExpiration.api);

      if (apiToken.error) {
        console.log('Login fail, could not sign token');
        res.status(500).json({ success: false, error: err });
        return;
      }

      res.status(200).json({ 
        userId: user._id,
        username: user.username,
        success: true,
        token: apiToken.token
      });
        
    })(req, res);
  })

  app.post('/server/api/auth/login', async (req, res) => {
    const { userName, password } = req.body;

    const user = await User.findOne({ username: userName });
    
    if (!user) {
      console.log('Login fail, user not found');
      return res
        .status(400)
        .json({ success: false, reason: "Username or password incorrect" });
    }

    const isMatch = await checkPasswordMatch(password, user.password);

    if (isMatch) {
      const sessionToken = await signJwtToken(user._id, user.username, tokenExpiration.session);
      res.cookie('jwt', sessionToken.token, { httpOnly: true });
      
      const apiToken = await signJwtToken(user._id, user.username, tokenExpiration.api);

      if (sessionToken.error || apiToken.error) {
        console.log('Login fail, could not sign token');
        
        res.status(400)
          .json({ success: false, reason: "Login error" });
        return;
      }

      console.log(`Login success: ${user.username}`);
      user.lastLogin = Date.now();
      user.save();

      res.status(200).json({
        userId: user._id,
        username: user.username,
        success: true,
        token: apiToken.token
      });

      return;

    } else {

      console.log('Login fail, password mismatch');
      return res
        .status(400)
        .json({ success: false, reason: "Username or password incorrect" });
    }
  });

  app.use('/server/api/auth/logout', (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({});
  });
};