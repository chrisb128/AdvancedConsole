const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const passport = require('passport');
const https = require('https');
const fs = require('fs');

const schema = require('./schema/schema');
const environment = require('./environment');
const config = require('./config');


mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to db');
});

const app = express();
app.use(express.json());
app.use(passport.initialize());
require('./passport')(passport);
require('./routes/auth')(app);


app.use('/server/api/query', 
  //passport.authenticate('jwt', { session: false }), 
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
