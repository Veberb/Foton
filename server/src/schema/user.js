const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: String
    login: String
    password: String
  }

  extend type Query {
    login(login: String!, password: String!): User
  }

  extend type Mutation {
    addUser(login: String!, password: String!): User
  }
`;
