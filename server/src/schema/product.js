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

  input FormProduct {
    id: String
    name: String
    description: String
    quantity: Int
    status: Status
  }

  extend type Query {
    listProducts(listQuery: ListQuery): [Product]
    getProduct(id: String): Product
  }

  extend type Mutation {
    addProduct(newProduct: FormProduct): Product
    updateProduct(newProduct: FormProduct): Product
  }
`;
