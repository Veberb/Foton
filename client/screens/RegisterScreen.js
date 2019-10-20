import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import client, { authMutation } from '../services/apollo';
import validate from '../validation';
import * as yup from 'yup';
import Toast from 'react-native-root-toast';

export default function RegisterScreen({ navigation }) {
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
      const { data } = await client.mutate({
        mutation: authMutation.REGISTER,
        variables: {
          newUser: { login: state.login, password: state.password },
        },
      });
      Toast.show('User created!', {
        duration: 1500,
        backgroundColor: 'green',
      });
      navigation.navigate('Home');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
});
