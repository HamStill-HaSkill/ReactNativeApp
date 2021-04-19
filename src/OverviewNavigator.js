import React, { useState, useEffect } from 'react';
import { firebase } from './firebase/config';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Detail from './Detail/Detail';
import Edit from './Detail/Edit';
import i18n from './i18n'
import Photos from './Detail/Photos';
import Overview from './Overview';
import { TextInput } from 'react-native-gesture-handler';
import { Value } from 'react-native-reanimated';

const Stack = createStackNavigator();

const OverviewNavigator = (props) => {
    const navigation = useNavigation();
    let [find, setFind] = useState('');

    return (
        <Stack.Navigator initialRouteName="Overview">

            <Stack.Screen name="Overview" options={{
                title: i18n.t('all_parks'),
                headerRight: () => (
                    <View style={{flexDirection: 'row'}}>
                        <TextInput placeholder={i18n.t('find')} style={{
                            marginRight: 20,
                            borderStyle: "solid",
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            width: 100,}} value={find} onChangeText={setFind}/>
                    <Text style={{ marginRight: 5, color: 'blue' }} onPress={props.signOut}>{i18n.t('signout')}</Text>
                    </View>
                ),
            }} children={() => <Overview user={props.user} find={find}/>} />

            <Stack.Screen name="Detail" options={{ title: i18n.t('detail') }} component={Detail} />
            <Stack.Screen name="Edit" options={{ title: i18n.t('edit') }} component={Edit} />
            <Stack.Screen name="Photos" options={{ title: i18n.t('photos') }} component={Photos} />
        </Stack.Navigator>
    );
}

export default OverviewNavigator;
