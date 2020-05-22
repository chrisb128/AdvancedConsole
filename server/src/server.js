import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import passport from 'passport';

import environment from './environment';

import typeDefs from './schema/schema';
import resolvers from './schema/resolvers';
import configurePassport from './passport';
import configureAuthRoutes from './routes/auth';


const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
};

const dbHost = process.env.DB_HOST;
mongoose.connect(`mongodb://${dbHost}:27017/advanced-console?authSource=admin`, mongoOptions);
mongoose.connection.once('open', () => {
  console.log('connected to db');
});


const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: !environment.prod,
  playground: !environment.prod,
  context: ({ req }) => {
    return { ip: req.ip, user: req.user };
  }
});

const app = express();
app.use(express.json());
app.set('trust_proxy', true);

configurePassport(passport);
app.use(passport.initialize());

app.use(cookieParser(process.env.JWT_SECRET));


app.use('/server/api/query', (req, res, next) => {
  
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    
    if (err) {
      res.status(401).send({ "error": err });
      return;
    }

    if (user) {
      req.user = user;
      
      next();
    } else {
      res.status(401).send({ "error": "User not found" });
    }
    return;
  })(req, res, next);
});

apollo.applyMiddleware({ app, path: '/server/api/query' });

configureAuthRoutes(app, passport);

app.listen(3030, () => {
  console.log('Listening on port 3030');
});