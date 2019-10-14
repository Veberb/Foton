import { gql } from 'apollo-boost';

const CREATE = gql`
  mutation addProduct($newProduct: FormProduct) {
    addProduct(newProduct: $newProduct) {
      name
    }
  }
`;

export default { CREATE };
