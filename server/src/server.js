import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import passport from 'passport';
import https from 'https';
import fs from 'fs';

import schema from './schema/schema';
import environment from './environment';
import config from './config';
import configurePassport from './passport';
import configureAuthRoutes from './routes/auth';

if (!!process.env.DB_HOST) {
  config.connectionString = `mongodb://${process.env.DB_HOST}:27017/advanced-console?authSource=admin`;
}

const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  user: process.env.DB_USER, 
  pass: process.env.DB_PASS
};

mongoose.connect(config.connectionString, mongoOptions);
mongoose.connection.once('open', () => {
  console.log('connected to db');
});

const app = express();
app.use(express.json());
app.use(passport.initialize());

configurePassport(passport);
configureAuthRoutes(app);

app.use('/server/api/query', 
  passport.authenticate('jwt', { session: false }), 
  graphqlHTTP({
    schema,
    graphiql: !environment.prod
  })
);

if (config.sslKeyPath && config.sslChainPath) {
  const httpsServer = https.createServer({
    key: fs.readFileSync(config.sslKeyPath),
    cert: fs.readFileSync(config.sslChainPath),
  }, app);
  
  httpsServer.listen(3030, () => {
    console.log('Listening securely on port 3030');
  });
} else {
  
  app.listen(3030, () => {
    console.log('Listening on port 3030');
  });
}
