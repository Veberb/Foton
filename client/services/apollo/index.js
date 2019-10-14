import ApolloClient from 'apollo-boost';
import { getToken } from '../auth';

const client = new ApolloClient({
  uri: 'http://10.0.0.106:8000/graphql',
  request: operation => {
    const token = getToken();
    operation.setContext({ headers: { 'foton-token': token } });
  },
});

export { default as authMutation } from './authMutation';
export { default as productQuery } from './productQuery';
export { default as productMutation } from './productMutation';

export default client;
