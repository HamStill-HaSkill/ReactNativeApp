import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useFonts, Inter_300Light } from '@expo-google-fonts/inter';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { setCustomText } from 'react-native-global-props';
import { firebase } from './src/firebase/config';
import { LogBox } from 'react-native';
import Login from './src/Login/Login';
import Register from './src/Register/Register';
import NavTab from './src/NavTab/NavTab';
import i18n from './src/i18n'

import MapNavigator from './src/Map/MapNavigator';
import OverviewNavigator from './src/OverviewNavigator';
import SettingsNavigator from './src/Settings/SettingsNavigator';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  let [isLogin, setIsLogin] = useState(false);
  let [isLoading, setLoading] = useState(true);
  let [user, setUser] = useState();

  let [lng, setLng] = useState('');
  let [font, setFont] = useState();
  let [isDark, setIsDark] = useState(false);

  let [fontsLoaded] = useFonts({
    Inter_300Light,
  });
  LogBox.ignoreAllLogs();

  const defaultTextProps = {
    style: {
      fontFamily: 'Inter_300Light',
      fontSize: 17,
    }
  }

  useEffect(() => {
    i18n.locale = lng;
    setLng(lng);
  }, [lng]);

  useEffect(() => {
    setCustomText(defaultTextProps);
  }, [fontsLoaded])
  
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setUser(userData)
            setLoading(false)
            setIsLogin(true)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  let signOut = () => {
    firebase.auth().signOut();
    setIsLogin(false);
  }

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      {/* Icons for navigation tabs */}
      <Tab.Navigator screenOptions={NavTab} tabBarOptions={{
        activeTintColor: '#333333',
        inactiveTintColor: 'gray',
      }}>
        {/* navigation tabs (bottom app)*/}
        {!isLogin && <Tab.Screen name="Login" options={{ title: i18n.t('log') }}
          children={() => !isLoading && <Login setIsLogin={setIsLogin} setUser={setUser} />} />}
        {!isLogin && <Tab.Screen name="Register" options={{ title: i18n.t('reg') }}
          children={() => !isLoading && <Register setIsLogin={setIsLogin} setUser={setUser} />} />}
        {isLogin && <Tab.Screen name="Overview" options={{ title: i18n.t('parks') }}
          children={() => <OverviewNavigator user={user} signOut={signOut} />} />}
        {isLogin && <Tab.Screen name="Map" options={{ title: i18n.t('map') }}
          children={() => <MapNavigator user={user} signOut={signOut} />} />}
        {isLogin && <Tab.Screen name="Settings" options={{ title: i18n.t('settings') }}
          children={() => <SettingsNavigator user={user} setLng={setLng} lng={lng} signOut={signOut}
            setIsDark={setIsDark} setFont={setFont} />} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
