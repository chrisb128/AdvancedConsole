const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const Server = require('../models/server');
const Event = require('../models/event');
const User = require('../models/user');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    lastLoginDate: { type: new GraphQLNonNull(GraphQLDate) }
  })
});

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    uuid: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const ServerType = new GraphQLObjectType({
  name: 'Server',
  fields: () => ({
    _id: { type: GraphQLID },
    uuid: { type: GraphQLString },
    name: { type: GraphQLString },
    host: { type: GraphQLString },
    status: { type: GraphQLString },
    users: { type: new GraphQLList(PlayerType) }
  })
});

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    _id: { type: GraphQLID },
    serverId: { type: GraphQLID },
    type: { type: GraphQLInt },
    time: { type: GraphQLDate },
    player: { type: PlayerType },
    message: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    server: {
        type: ServerType,
      //argument passed by the user while making the query
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Here we define how to get data from database source
        //this will return the book with id passed in argument by the user
        return Server.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: {},
      resolve(parent, args) {
        return User.find({});
      }
    },
    serverByUuid: {
      type: ServerType,
      args: { 
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Server.findOne({ uuid: args.uuid });
      }
    },
    servers: {
      type: new GraphQLList(ServerType),
      args: {},
      resolve(parent, args) {
          return Server.find({}).sort({ lastReportTime: -1 });
      }
    },
    events: {
      type: new GraphQLList(EventType),
      args: { serverId: { type: GraphQLID } },
      resolve(parent, args) {
        return Event.find({ serverId: args.serverId }).sort({ time: -1 });
      }
    }
  }
});

const PlayerInput = new GraphQLInputObjectType({
  name: 'PlayerInput',
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    uuid: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addServer: {
      type: ServerType,
      args: {
        //GraphQLNonNull make these field required
        name: { type: new GraphQLNonNull(GraphQLString) },
        host: { type: new GraphQLNonNull(GraphQLString) },
        uuid: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Server.create({
          name: args.name,
          host: args.host,
          uuid: args.uuid,
          status: '',
          time: Date.now(),
          users: []
        });
      }
    },
    updateServerStatus: {
      type: ServerType,
      args: {
        serverId: { type: new GraphQLNonNull(GraphQLID) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        users: { type: new GraphQLList(PlayerInput) }
      },
      resolve(parent, args) {
        return Server.findById(args.serverId).then(server => {
          server.lastReportTime = Date.now();
          server.status = args.status;
          server.users = args.users;
          server.save();
          return server;
        })
      }
    },
    addEvent: {
      type: EventType,
      args: {
        serverId: { type: new GraphQLNonNull(GraphQLString) },
        eventType: { type: new GraphQLNonNull(GraphQLInt) },
        player: { type: PlayerInput },
        message: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {

        return Event.create({
          serverId: args.serverId,
          type: args.type,
          player: args.player,
          message: args.message,
          time: Date.now()
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});