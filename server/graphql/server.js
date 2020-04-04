const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');
const environment = require('./environment');
const config = require('./config');

const User = require('./models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { signJwtToken, configurePassport } = require('./auth');

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to db');
});

const app = express();

app.use(express.json());

app.use(passport.initialize());
configurePassport(passport);

app.post('/api/auth/login', (req, res) => {
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

app.use('/api/query', 
  passport.authenticate('jwt', { session: false }), 
  graphqlHTTP({
    schema,
    graphiql: !environment.prod
  })
);

app.listen(3030, () => {
  console.log('Listening on port 3030');
});