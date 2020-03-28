const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const Server = require('../models/server');
const Event = require('../models/event');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLArray,
    GraphQLNonNull
} = graphql;

const ServerType = new GraphQLObjectType({
    name: 'Server',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        host: { type: GraphQLString },
        status: { type: GraphQLString },
    })
});

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        _id: { type: GraphQLID },
        serverId: { type: GraphQLID },
        type: { type: GraphQLInt },
        time: { type: GraphQLDate },
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
        servers: {
            type: new GraphQLList(ServerType),
            args: {},
            resolve(parent, args) {
                return Server.find({});
            }
        },
        events: {
            type: new GraphQLList(EventType),
            args: { serverId: { type: GraphQLID } },
            resolve(parent, args) {
                return Event.find({ serverId: args.serverId });
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addServer: {
            type: ServerType,
            args: {
                //GraphQLNonNull make these field required
                name: { type: new GraphQLNonNull(GraphQLString) },
                host: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Server.create({
                    name: args.name,
                    host: args.host,
                    status: ''
                });
            }
        },
        addEvent: {
            type: EventType,
            args: {
                serverId: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLInt) },
                message: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Event.create({
                    serverId: args.serverId,
                    type: args.type,
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