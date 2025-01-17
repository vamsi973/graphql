// src/schema/typeDefs.js
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
    users: [User],
    urls: [url]
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    currency: String!
  }
  
  type url {
    url:String!
  }

  type Mutation {
    addUser(name: String!, email: String!, currency: String!): User,
    createUrl(url:String!):url
  }
`;
