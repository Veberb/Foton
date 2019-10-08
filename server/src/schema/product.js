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

  input ListQuery {
    page: Int!
    limit: Int
    search: String
  }

  extend type Query {
    listProducts(listQuery: ListQuery): [Product]
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
