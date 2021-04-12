import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './src/firebase/config';
import Login from './src/Login/Login';
import Register from './src/Register/Register';
import NavTab from './src/NavTab/NavTab';
import NavBar from './src/NavTab/NavBar';
import MapNavigator from './src/Map/MapNavigator';
import OverviewNavigator from './src/OverviewNavigator';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  let [isLogin, setIsLogin] = useState(false);
  let [isLoading, setLoading] = useState(true);
  let [user, setUser] = useState();

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
  
  return (
    <NavigationContainer>
      {/* Icons for navigation tabs */}
      <Tab.Navigator screenOptions={NavTab} tabBarOptions={{
        activeTintColor: '#333333',
        inactiveTintColor: 'gray',
      }}>
        {/* navigation tabs (bottom app)*/}
        {!isLogin && <Tab.Screen name="Login" children={() => !isLoading && <Login setIsLogin={setIsLogin} setUser={setUser} />} />}
        {!isLogin && <Tab.Screen name="Register" children={() => !isLoading && <Register setIsLogin={setIsLogin} setUser={setUser} />} />}
        {isLogin && <Tab.Screen name="Overview" children={() => <OverviewNavigator user={user} />} />}
        {isLogin && <Tab.Screen name="Map" children={() => <MapNavigator user={user} />} />}
        {isLogin && <Tab.Screen name="Settings" component={OverviewNavigator} user={user} />}
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
