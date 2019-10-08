import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import client, { authMutation } from '../services/apollo';
import { setToken, getToken } from '../services/auth';
import validate from '../validation';
import * as yup from 'yup';
import Toast from 'react-native-root-toast';

export default function HomeScreen() {
  const [state, setState] = useState({
    login: 'vveber',
    password: 'joao',
    confirmPassword: 'joao',
  });

  const inputHandler = (field, value) =>
    setState(newState => ({ ...newState, [field]: value }));

  const signIn = async () => {
    try {
      await validate({
        shape: {
          login: yup.string().required(),
          password: yup
            .string()
            .required()
            .min(3),
          confirmPassword: yup
            .string()
            .required()
            .test('passwords-match', 'Passwords must match', function(value) {
              return this.parent.password === value;
            }),
        },
        state,
      });
      const newUser = { login: state.login, password: state.password };
      const { data } = await client.mutate({
        mutation: authMutation.REGISTER,
        variables: { newUser },
      });
    } catch (err) {
      Toast.show(err['message'], { duration: 1500, backgroundColor: 'red' });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.welcomeContainer}>
        <Image
          source={require('../assets/images/foton.png')}
          style={styles.welcomeImage}
        />
      </View>

      <View style={styles.getStartedContainer}>
        <Input
          label="Login"
          value={state.login}
          onChangeText={value => inputHandler('login', value)}
          placeholder="email@address.com"
        />
        <Input
          label="Password"
          value={state.password}
          onChangeText={value => inputHandler('password', value)}
          secureTextEntry={true}
          placeholder="Password"
        />
        <Input
          label="Confirm Password"
          value={state.confirmPassword}
          onChangeText={value => inputHandler('confirmPassword', value)}
          secureTextEntry={true}
          placeholder="Confirm Password"
        />
      </View>

      <View style={styles.helpContainer}>
        <Button
          title="Register"
          onPress={signIn}
          buttonStyle={{ width: 100 }}
        />
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});