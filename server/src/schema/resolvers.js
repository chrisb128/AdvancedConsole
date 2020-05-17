import { GraphQLScalarType } from 'graphql'
import bcrypt from 'bcryptjs';
import Server from '../models/server';
import User from '../models/user';
import Event from '../models/event';

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    me: (parent, args, context, info) => {
      return User.findById(context.user._id);
    },
    user: (parent, args, context, info) => {
      return User.findById(args.id);
    },
    users: (parent, args, context, info) => {
      return User.find({});
    },
    server: (parent, args, context, info) => {
      return Server.findById(args.id);
    },
    servers: (parent, args, context, info) => {
      return Server.find({}).sort({ lastReportTime: -1 });
    },
    events: (parent, args, context, info) => {

      let eventsQuery = Event.find({ serverId: args.serverId });

      if (args.filter) {
        eventsQuery = eventsQuery.where('type').in(args.filter.types) 
      } 
      
      return eventsQuery
        .skip(args.offset)
        .limit(args.limit)
        .sort({ time: -1 }) || [];
    },
  },
  Mutation: {
    addUser: (parent, args, context, info) => {
      return User.create({
        username: args.username
      }).then(user => {
        return bcrypt.genSalt(10, (err, salt) => {
          return bcrypt.hash(args.password, salt, (err, hash) => {

            if (err) throw err;

            user.password = hash;
            user.save();

            return user;
          });
        });
      });
    },
    updateUserPassword: (parent, args, context, info) => {
      return User.findById(context.user._id).then(user => {
        return bcrypt.compare(args.oldPassword, user.password).then(isMatch => {

          if (isMatch) {
            return bcrypt.genSalt(10, (err, salt) => {
              return bcrypt.hash(args.newPassword, salt, (err, hash) => {
  
                if (err) throw err;
                user.password = hash;
                user.save();
                
                return user;
              });
            });
          } else {
            return null;
          }
        });
      });
    },
    addServer: (parent, args, context, info) => {
      return Server.create({
        name: args.name,
        host: args.host,
        status: '',
        time: Date.now(),
        users: [],
        hidden: false
      });
    },
    updateServerStatus: (parent, args, context, info) => {
      return Server.findById(args.serverId).then(server => {
        server.lastReportTime = Date.now();
        server.status = args.status;
        server.users = args.users;
        server.save();
        return server;
      });
    },
    addEvent: (parent, args, context, info) => {
      return Event.create({
        serverId: args.serverId,
        type: args.eventType,
        player: args.player,
        message: args.message,
        time: Date.now()
      });
    }
  }
};