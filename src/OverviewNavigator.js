import React, { useState, useEffect } from 'react';
import { firebase } from './firebase/config';
import { SafeAreaView, StyleSheet, View, FlatList, Image, Button, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Detail from './Detail/Detail';
import Map from './Map/Map';
import Photos from './Detail/Photos';
import Overview from './Overview';

const Stack = createStackNavigator();

const OverviewNavigator = (props) => {
    const navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName="Overview">
            <Stack.Screen name="Overview" options={{title: "All parks"}} children={() => <Overview user={props.user} />} />
            <Stack.Screen name="Map" options={{title: "Map"}} children={() => <Map user={props.user} />} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Photos" component={Photos} />
        </Stack.Navigator>
    );
}

export default OverviewNavigator;
