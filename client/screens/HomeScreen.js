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
import client, { authMutation } from '../services/apollo/';
import { setToken } from '../services/auth';
import Toast from 'react-native-root-toast';

export default function HomeScreen({ navigation }) {
  const [state, setState] = useState({
    login: '',
    password: '',
  });

  const inputHandler = (field, value) =>
    setState(newState => ({ ...newState, [field]: value }));

  const signIn = async () => {
    try {
      const { data } = await client.mutate({
        mutation: authMutation.SIGN_IN,
        variables: { authentication: { ...state } },
      });
      setToken(data.signIn);
      navigation.navigate('ProductList');
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
      </View>

      <View style={styles.helpContainer}>
        <Button title="Sign in" onPress={signIn} buttonStyle={{ width: 100 }} />
      </View>

      <View style={styles.helpContainer}>
        <Text
          style={styles.helpLinkText}
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          Create Account
        </Text>
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

  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },

  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
