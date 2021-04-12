import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Detail from '../Detail/Detail';
import Map from './Map';
import Photos from '../Detail/Photos';

const Stack = createStackNavigator();

const MapNavigator = (props) => {
    const navigation = useNavigation();

    return (
        
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen name="Map" options={{title: "Map"}} children={() => <Map user={props.user} 
                                        parksData={props.parksData} navigation={navigation}/>} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Photos" component={Photos} />
        </Stack.Navigator>
    );
}

export default MapNavigator;
