import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/config';
import { SafeAreaView, Modal, StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
const Photos = ({ navigation, route }) => {

    let [modalVisible, setModalVisible] = useState(false);
    let [src, setSrc] = useState("");
    const photos = route.params.photos;

    let showModal = (src) => {
        setModalVisible(true);
        setSrc(src);
    }
    return (
        <SafeAreaView style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={modalVisible}
                onRequestClose={() => props.setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <Image style={styles.ModalImg} source={{ uri: src }} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
            <FlatList data={photos} renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                    <TouchableWithoutFeedback onPress={() => showModal(item.src)} >
                        <View style={styles.itemContainer}>
                            <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )} numColumns={3} keyExtractor={(item, index) => index} />
        </SafeAreaView>

    );
};
export default Photos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        borderRadius: 3,
    },
    itemContainer: {
        alignItems: 'center',
        borderColor: 'gray',
        borderStyle: 'solid',
    },
    ModalImg: {
        marginLeft: 30,
        marginTop: 150,
        height: 300,
        width: 300,
        borderWidth: 1,
        borderColor: 'black',
    },

});
