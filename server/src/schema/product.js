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

  type Query {
    hello: String
    listProducts(page: Int!, limit: Int!): [Product]
    getProduct(id: ID!): Product
  }

  type Mutation {
    addProduct(
      name: String!
      description: String!
      quantity: Int
      status: Status
    ): Product
  }
`;
