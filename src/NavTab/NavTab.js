import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

let NavTab = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      // Icons from https://infinitered.github.io/ionicons-version-3-search/?
      if (route.name === 'Login') {
        iconName = focused ? 'md-person' : 'md-person-outline';
      } else if (route.name === 'Register') {
        iconName = focused ? 'md-person-add' : 'md-person-add-outline';
      }
      else if (route.name === 'Overview') {
        iconName = focused ? 'ios-apps' : 'ios-apps-outline';
      }
      else if (route.name === 'Map') {
        iconName = focused ? 'ios-navigate' : 'ios-navigate-outline';
      }
      else if (route.name === 'Settings') {
        iconName = focused ? 'ios-settings' : 'ios-settings-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })

  export default NavTab;