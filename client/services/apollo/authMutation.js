import { gql } from 'apollo-boost';

const SIGN_IN = gql`
  mutation signIn($authentication: SignIn) {
    signIn(authentication: $authentication)
  }
`;

export default { SIGN_IN };
