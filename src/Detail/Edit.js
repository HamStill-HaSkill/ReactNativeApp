import React, { useState, useEffect, useRef } from 'react';
import { firebase } from '../firebase/config';
import { SafeAreaView, TextInput, StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableWithoutFeedback, Button } from 'react-native';
import i18n from '../i18n'

const Edit = ({ navigation, route }) => {

    const park = route.params.park;
    let [name, setName] = useState(park.name)
    let [description, setDescription] = useState(park.description)
    let [location, setLocation] = useState(park.location)
    const entityRef = firebase.firestore().collection('parks')

    let saveData = () => {
        console.log(name);
        entityRef.doc(park.id).update({name, description, location});
        navigation.popToTop();
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <Image style={styles.imageThumbnail} source={{ uri: park.src }} />
                <TextInput style={styles.text} value={name} onChangeText={setName} />
                <TextInput style={styles.text} value={description} onChangeText={setDescription} />
                <TextInput style={styles.text} value={location} onChangeText={setLocation} />
            </View>
            <Button onPress={saveData} title={i18n.t('save')} />
        </View>

    );
};
export default Edit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-around',
    },
    containerText: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        borderStyle: 'solid',
        width: 300,
        marginVertical: 5,
        color: '#333333',
        fontSize: 15,
        marginVertical: 10,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
        borderRadius: 90,
    },
});
