import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql';

import GraphQLDate from 'graphql-date';
import Server from '../models/server';
import Event from '../models/event';
import User from '../models/user';

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
    name: { type: GraphQLString },
    host: { type: GraphQLString },
    status: { type: GraphQLString },
    lastReportTime: { type: GraphQLDate },
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

const EventQueryFilterType = new GraphQLInputObjectType({
  name: 'EventQueryFilter',
  fields: () => ({
    types: { type: new GraphQLList(GraphQLInt) }
  })
})

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
    servers: {
      type: new GraphQLList(ServerType),
      args: {},
      resolve(parent, args) {
          return Server.find({}).sort({ lastReportTime: -1 });
      }
    },
    events: {
      type: new GraphQLList(EventType),
      args: {
        serverId: { type: new GraphQLNonNull(GraphQLID) },
        offset: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: new GraphQLNonNull(GraphQLInt) },
        filter: { type: EventQueryFilterType }
      },
      resolve(parent, args) {
        if (!args.filter) {
          return Event.find({ serverId: args.serverId })
            .skip(args.offset)
            .limit(args.limit)
            .sort({ time: -1 });
        } else {          
          return Event.find({ serverId: args.serverId })
            .where('type').in(args.filter.types)
            .skip(args.offset)
            .limit(args.limit)
            .sort({ time: -1 });
        }
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
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        
        User.create({
          username: args.username
        }).then(user => {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(args.password, salt, (err, hash) => {

              if (err) throw err;
              user.password = hash;
              user.save()
                .then(user => response.json(user));
            });
          });
        });
      }
    },
    addServer: {
      type: ServerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        host: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Server.create({
          name: args.name,
          host: args.host,
          status: '',
          time: Date.now(),
          users: [],
          hidden: false
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
          type: args.eventType,
          player: args.player,
          message: args.message,
          time: Date.now()
        });
      }
    }
  }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});