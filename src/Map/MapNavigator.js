import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Detail from '../Detail/Detail';
import { Text } from 'react-native';
import Map from './Map';
import i18n from '../i18n'
import Photos from '../Detail/Photos';
import Edit from '../Detail/Edit';

const Stack = createStackNavigator();

const MapNavigator = (props) => {
    const navigation = useNavigation();

    return (
        
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen name="Map" options={{
                title: i18n.t('map'),
                headerRight: () => (
                    <Text style={{marginRight: 5, color: 'blue'}} onPress={props.signOut}>{i18n.t('signout')}</Text>
                  ),}} children={() => <Map user={props.user} 
                                        parksData={props.parksData} navigation={navigation}/>} />
            <Stack.Screen name="Detail" options={{title: i18n.t('detail')}} component={Detail} />
            <Stack.Screen name="Photos" options={{title: i18n.t('photos')}} component={Photos} />
            <Stack.Screen name="Edit" options={{title: i18n.t('edit')}} component={Edit} />
        </Stack.Navigator>
    );
}

export default MapNavigator;
