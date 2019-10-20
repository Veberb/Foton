import { gql } from 'apollo-boost';

const LIST = gql`
  query listProducts($listQuery: ListQuery) {
    listProducts(listQuery: $listQuery) {
      id
      name
      quantity
      status
    }
  }
`;

const GET = gql`
  query listProducts($id: String) {
    getProduct(id: $id) {
      id
      name
      quantity
      status
      description
    }
  }
`;

export default { LIST, GET };
