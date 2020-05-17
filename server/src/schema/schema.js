import { gql } from 'apollo-server-express';

const schema = gql`
  scalar Date

  type User {
    id: ID,
    username: String,
    lastLoginDate: Date
  }

  type Player {
    username: String,
    uuid: String
  }

  type Server {
    id: ID,
    name: String,
    host: String,
    status: String,
    lastReportTime: Date
    users: [Player]
  }

  type Event {
    id: ID,
    serverId: ID,
    type: Int,
    time: Date,
    player: Player,
    message: String
  }

  input EventQueryFilter {
    types: [Int]
  }

  type Query {
    me: User,
    user(id: ID): User,
    users: [User],
    server(serverId: ID): Server,
    servers: [Server],
    events(serverId: ID, offset: Int, limit: Int, filter: EventQueryFilter): [Event],
  }

  input PlayerInput {
    username: String,
    uuid: String
  }

  type Mutation {
    addUser(username: String, password: String): User,
    updateUserPassword(oldPassword: String, newPassword: String): User,
    addServer(name: String, host: String): Server,
    removeServer(serverId: ID): ID,
    updateServerStatus(serverId: ID, status: String, users: [PlayerInput]): Server,
    addEvent(serverId: ID, eventType: Int, player: PlayerInput, message: String): Event
  }
`;

export default schema;