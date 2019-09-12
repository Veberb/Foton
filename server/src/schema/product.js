const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Status {
    ACTIVE
    INACTIVE
    DELETED
  }

  type Product {
    id: String
    name: String
    description: String
    quantity: Int
    status: Status
  }

  extend type Query {
    listProducts(page: Int!, limit: Int!): [Product]
    getProduct(id: ID!): Product
  }

  extend type Mutation {
    addProduct(
      name: String!
      description: String!
      quantity: Int
      status: Status
    ): Product

    updateProduct(
      id: ID!
      name: String
      description: String
      quantity: Int
      status: Status
    ): Product
  }
`;
