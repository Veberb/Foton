import { gql } from 'apollo-boost';

const SIGN_IN = gql`
  mutation signIn($authentication: SignIn) {
    signIn(authentication: $authentication)
  }
`;

const REGISTER = gql`
  mutation addUser($newUser: SignIn) {
    addUser(newUser: $newUser) {
      login
    }
  }
`;

export default { SIGN_IN, REGISTER };
