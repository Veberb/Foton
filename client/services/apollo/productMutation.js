import { gql } from 'apollo-boost';

const CREATE = gql`
  mutation addProduct($newProduct: FormProduct) {
    addProduct(newProduct: $newProduct) {
      name
    }
  }
`;

const UPDATE = gql`
  mutation updateProduct($newProduct: FormProduct) {
    updateProduct(newProduct: $newProduct) {
      name
    }
  }
`;

export default { CREATE, UPDATE };
