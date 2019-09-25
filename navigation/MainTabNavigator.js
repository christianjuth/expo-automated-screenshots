import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';


import StaticText from '../screens/static/Text';
import StaticList from '../screens/static/List';
import DynamicText from '../screens/dynamic/Text';
import DynamicList from '../screens/dynamic/List';


const config = {
  defaultNavigationOptions: {
    header: null
  }
};


const StaticStack = createStackNavigator(
  {
    Text: {
      screen: StaticText,
      path: 'text'
    },
    List: {
      screen: StaticList,
      path: 'list'
    },
  },
  config
);
StaticStack.path = 'static';


const DynamicStack = createStackNavigator(
  {
    Test: {
      screen: DynamicText,
      path: 'text'
    },
    List: {
      screen: DynamicList,
      path: 'list'
    },
  },
  config
);
DynamicStack.path = 'dynamic';


const tabNavigator = createSwitchNavigator({
  StaticStack,
  DynamicStack
});
tabNavigator.path = '';


export default tabNavigator;
