# Foton

## Description

- Project created to open position @Foton Tech Company.

## Enviroment

- [Expo](https://expo.io/learn) - 3.0.10
- [Node](https://nodejs.org/en/) - v10.15.0
- [MongoDB](https://www.mongodb.com/download-center/community) v4.2.0

## Tests

- You can run tests using the command

```sh
npm run test
```

## Running Project

- First of all, you need to install client and backend dependencies.

```sh
npm run install
```

- After install dependencias, you should change uri in ApolloClient to your ip address. You can find [here](client/services/apollo/index.js).
- Once you change ip, you can run your client and backend using following command's at root directory

```sh
npm run client
```

```sh
npm run server
```

- In order to test app in your phone, you'll need to download Expo app at PlayStore or Appstore.
- When app is installed, you should read QRcode generated by Expo and start using the app.
