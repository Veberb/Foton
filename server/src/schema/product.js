const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Status {
    ACTIVE
    INACTIVE
    DELETED
  }

  type Query {
    hello: String
    listProducts(page: Int!, limit: Int!): [Product]
  }

  type Product {
    id: String
    name: String
    description: String
    quantity: Int
    status: Status
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
