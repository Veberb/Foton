const { gql } = require('apollo-server-express');
const productSchema = require('./product');
const userSchema = require('./user');

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, productSchema, userSchema];
