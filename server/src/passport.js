import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from './models/user';

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  } else {
      console.log('no cookie found');
  }
  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: process.env.JWT_SECRET
};

export default passport => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {      
      User.findById(jwtPayload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};