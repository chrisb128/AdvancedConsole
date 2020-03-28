const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

mongoose.connect('mongodb://localhost/advanced-console');
mongoose.connection.once('open', () => {
    console.log('connected to db');
});

const app = express();
app.use('/api', graphqlHTTP({
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    //TODO: shut this off in production
    graphiql: true
}));

app.listen(3030, () => {
    console.log('Listening on port 3030');
});