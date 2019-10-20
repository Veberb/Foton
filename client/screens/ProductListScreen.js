import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import ListSeparator from '../components/ListSeparator';

import { ListItem, SearchBar } from 'react-native-elements';

export default function ProductListScreen({ navigation }) {
  const [state, setState] = useState([]);
  const page = useRef(1);
  const hasMore = useRef(true);
  const [isFetching, setFetching] = useState(false);
  const [search, setSearch] = useState('');

  const getList = useCallback(async () => {
    if (!hasMore.current) return;
    setFetching(true);

    const currentPage = page.current;
    const { data } = await client.query({
      query: productQuery.LIST,
      variables: { listQuery: { page: page.current, search } },
      fetchPolicy: 'no-cache',
    });
    setState(
      currentPage === 1
        ? [...data.listProducts]
        : [...state, ...data.listProducts]
    );
    page.current += 1;
    hasMore.current = data.listProducts.length === 10;

    setFetching(() => false);
  }, [state]);

  const timeOutId = useRef();
  const debounce = () => {
    timeOutId.current = setTimeout(() => {
      hasMore.current = true;
      page.current = 1;
      getList();
    }, 1000);
  };

  useEffect(() => {
    debounce();
  }, [search]);

  useEffect(() => {
    getList();
    const getFocus = navigation.addListener('willFocus', () => {
      hasMore.current = true;
      page.current = 1;
      getList();
    });
  }, []);

  const renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      title={`${item.name}`}
      subtitle={item.status}
      onPress={() => navigation.navigate('Product', { id: item.id })}
      badge={{
        value: item.quantity,
        textStyle: { color: 'white' },
        containerStyle: { marginTop: -20 },
      }}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );

  const renderFooter = () =>
    isFetching && (
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
        data={state}
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
        onPress={() => {
          navigation.navigate('Product');
        }}
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
