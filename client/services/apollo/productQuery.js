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

export default { LIST };
