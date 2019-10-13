import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native';
import client, { productQuery } from '../services/apollo';
import { setToken, getToken } from '../services/auth';
import validate from '../validation';
import * as yup from 'yup';
import Toast from 'react-native-root-toast';
import ListSeparator from '../components/ListSeparator';

import { ListItem, SearchBar, List, Button } from 'react-native-elements';

export default function HomeScreen() {
  const [state, setState] = useState({
    items: [],
    page: 1,
  });
  const [search, setSearch] = useState('');
  const [firstLoading, setFirstLoading] = useState(true);

  const getList = async () => {
    console.log('oi fui chamado');
    const { page } = state;
    const { data } = await client.query({
      query: productQuery.LIST,
      variables: { listQuery: { page, search } },
    });

    setState(old => ({
      ...old,
      items:
        page === 1
          ? [...data.listProducts]
          : [...state.items, ...data.listProducts],
      page: state.page + 1,
    }));
  };

  const [debouceTimeOut, setDebouceTimeOut] = useState();
  const debounce = () => {
    clearTimeout(debouceTimeOut);
    setDebouceTimeOut(
      setTimeout(() => {
        setState(old => ({ ...old, page: 1 }));
        getList();
      }, 1000)
    );
  };

  useEffect(() => {
    if (firstLoading) return;

    debounce(search);
  }, [search]);

  useEffect(() => {
    getList().then(() => {
      setFirstLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      title={`${item.name}`}
      subtitle={item.status}
      badge={{
        value: item.quantity,
        textStyle: { color: 'white' },
        containerStyle: { marginTop: -20 },
      }}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );

  const renderFooter = () => (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#CED0CE',
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );

  const renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search name"
        lightTheme
        round
        containerStyle={{ backgroundColor: '#fff' }}
        onChangeText={setSearch}
        value={search}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search name"
        lightTheme
        round
        containerStyle={{ backgroundColor: '#fff' }}
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={state.items}
        renderItem={renderItem}
        ItemSeparatorComponent={ListSeparator}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.1}
        onEndReached={getList}
      />
      <TouchableHighlight
        style={styles.addButton}
        underlayColor="#ff7043"
        onPress={() => {}}
      >
        <Text style={{ fontSize: 25, color: 'white' }}>+</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});
