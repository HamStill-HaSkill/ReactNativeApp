import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/config';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';

const Detail = ({ navigation, route }) => {

  const park = route.params.item;
  let [photos, setPhotos] = useState();
  const entityRef = firebase.firestore().collection('photos')

  useEffect(() => {
    entityRef.where("parkID", "==", park.id).onSnapshot(query => {
              let parkPhotos = [];
              query.forEach(photo => {
                  let data = photo.data();
                  parkPhotos.push({ src: data.src })
              });
              setPhotos(parkPhotos);
          },
          error => {
              console.log(error)
          }
      )
}, [])

  return (
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Image style={styles.imageThumbnail} source={{ uri: park.src }} />
          <Text style={styles.textName}>{park.name}</Text>
          <Text style={styles.textDesctiption}>{park.description}</Text>
          <Text style={styles.textLocation}>{park.loacation}</Text>
        </View>
        <SafeAreaView style={styles.containerRow}>
      <ScrollView horizontal={true}>
        <FlatList data={photos} renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
            <TouchableWithoutFeedback onPress={() => navigation.push("Photos", {photos})}>
              <Image style={styles.imageRow} source={{ uri: item.src }} />
            </TouchableWithoutFeedback>
          </View>
        )} numColumns={10} keyExtractor={(item, index) => index} />
      </ScrollView>
    </SafeAreaView>
    </View>

  );
};
export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  containerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRow: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 90,
  },
  imageRow: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  textName: {
    textAlign: 'center',
    fontSize: 17,
  },
  textDesctiption: {
    textAlign: 'center',
    color: 'gray',
  },
  textLocation: {
    color: 'black',
    textAlign: 'center',
  }
});
