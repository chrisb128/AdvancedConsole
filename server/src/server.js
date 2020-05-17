import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import passport from 'passport';

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
  context: ({req}) => {
    return { ip: req.ip, user: req.user };
  }
});

const app = express();
app.use(express.json());
app.set('trust_proxy', true);
app.use(passport.initialize());

app.use('/server/api/query', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user
    }

    next()
  })(req, res, next)
});

apollo.applyMiddleware({ app, path: '/server/api/query' });

configurePassport(passport);
configureAuthRoutes(app);

app.listen(3030, () => {
  console.log('Listening on port 3030');
});