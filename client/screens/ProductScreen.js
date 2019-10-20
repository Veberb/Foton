import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Picker } from 'react-native';
import { Button, Input } from 'react-native-elements';
import client, { productMutation, productQuery } from '../services/apollo';
import validate from '../validation';
import * as yup from 'yup';
import Toast from 'react-native-root-toast';
import NumericInput from 'react-native-numeric-input';

export default function ProductScreen({ navigation }) {
  const [state, setState] = useState({
    name: '',
    description: '',
    quantity: 0,
    status: 'ACTIVE',
  });

  const [action, setAction] = useState({
    mutation: productMutation.CREATE,
    message: 'Product Created',
    button: 'Create',
  });

  const inputHandler = (field, value) =>
    setState(newState => ({ ...newState, [field]: value }));

  const submit = async () => {
    try {
      await validate({
        shape: {
          name: yup
            .string()
            .required()
            .min(3),
          description: yup
            .string()
            .required()
            .min(3),
          quantity: yup.number().required(),
        },
        state,
      });
      await client.mutate({
        mutation: action.mutation,
        variables: {
          newProduct: { ...state },
        },
      });
      Toast.show(action.message, {
        duration: 1500,
        backgroundColor: 'green',
      });
      navigation.navigate('ProductList');
    } catch (err) {
      Toast.show(err['message'], { duration: 1500, backgroundColor: 'red' });
    }
  };

  const getProductById = async () => {
    const {
      data: { getProduct },
    } = await client.query({
      query: productQuery.GET,
      variables: { id: navigation.getParam('id') },
      fetchPolicy: 'no-cache',
    });
    setAction({
      mutation: productMutation.UPDATE,
      message: 'Product Updated',
      button: 'Update',
    });
    delete getProduct.__typename;
    setState({ ...getProduct });
  };

  useEffect(() => {
    if (navigation.getParam('id')) getProductById();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.getStartedContainer}>
        <Input
          label="Name"
          value={state.name}
          onChangeText={value => inputHandler('name', value)}
          placeholder="Product Name"
        />
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <NumericInput
              type="up-down"
              value={state.quantity}
              onChange={value => inputHandler('quantity', value)}
              minValue={0}
              valueType={'integer'}
            />
          </View>
          <View style={styles.inputWrap}>
            <Picker
              label="Confirm Password"
              selectedValue={state.status}
              onValueChange={itemValue => inputHandler('status', itemValue)}
            >
              <Picker.Item label="Active" value="ACTIVE" />
              <Picker.Item label="Inactive" value="INACTIVE" />
            </Picker>
          </View>
        </View>
        <Input
          label="Description"
          value={state.description}
          onChangeText={value => inputHandler('description', value)}
          placeholder="Product Description"
        />
      </View>

      <View style={styles.helpContainer}>
        <Button
          title={action.button}
          onPress={submit}
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
  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
  },
  inputWrap: {
    flex: 1,
    marginBottom: 10,
  },
  contentContainer: {
    paddingTop: 30,
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
