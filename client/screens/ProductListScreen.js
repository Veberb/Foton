import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
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

import { ListItem, List, Button } from 'react-native-elements';

export default function HomeScreen() {
  const [state, setState] = useState({
    items: [],
    page: 1,
  });

  const getList = async () => {
    if (state.loading) return;

    setTimeout(async () => {
      const { data } = await client.query({
        query: productQuery.LIST,
        variables: { listQuery: { page: state.page } },
      });

      setState({
        items: [...state.items, ...data.listProducts],
        page: state.page + 1,
      });
    }, 1500);
  };

  useEffect(() => {
    getList();
  }, []);

  renderItem = ({ item }) => (
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

  renderFooter = () => (
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
    <FlatList
      data={state.items}
      renderItem={renderItem}
      ItemSeparatorComponent={ListSeparator}
      keyExtractor={item => item.id}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.1}
      onEndReached={getList}
    />
  );
}

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
    //paddingTop: 30,
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
