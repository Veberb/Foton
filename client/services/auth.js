let token;

const setToken = newToken => {
  token = newToken;
  return token;
};

const getToken = () => {
  return token;
};

export { setToken, getToken };
