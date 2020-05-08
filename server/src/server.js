import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import passport from 'passport';

import schema from './schema/schema';
import environment from './environment';
import configurePassport from './passport';
import configureAuthRoutes from './routes/auth';

const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  user: process.env.DB_USER, 
  pass: process.env.DB_PASS
};

mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/advanced-console?authSource=admin`, mongoOptions);
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

app.listen(3030, () => {
  console.log('Listening on port 3030');
});