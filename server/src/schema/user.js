const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: String
    login: String
    password: String
  }

  input SignIn {
    login: String!
    password: String!
  }

  extend type Mutation {
    addUser(login: String!, password: String!): User
    signIn(authentication: SignIn): String
  }
`;
