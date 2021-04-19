import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import Settings from './Settings';
import i18n from '../i18n'


const Stack = createStackNavigator();

const SettingsNavigator = (props) => {

    let [lng, setLng] = useState(props.lng);

    useEffect(() => {
        i18n.locale = lng;
        props.setLng(lng)
        setLng(lng);
    }, [lng]);

    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="Settings" options={{
                title: i18n.t('settings'),
                headerRight: () => (
                    <Text style={{ marginRight: 5, color: 'blue' }} onPress={props.signOut}>{i18n.t('signout')}</Text>
                ),
            }} children={() => <Settings user={props.user} setLng={setLng}
                lng={lng} setIsDark={props.setIsDark} setFont={props.setFont} />} />
        </Stack.Navigator>
    );
}

export default SettingsNavigator;
