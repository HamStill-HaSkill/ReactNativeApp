import React, { useState, useEffect, useRef } from 'react';
import { firebase } from '../firebase/config';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

const Detail = ({ navigation, route }) => {

  let [park, setPark] = useState(route.params.item);
  let [photos, setPhotos] = useState();
  const video = useRef(null);
  const [status, setStatus] = React.useState({});
  const entityRef = firebase.firestore().collection('photos')

  useEffect(() => {
    entityRef.onSnapshot(query => {
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
        <Text style={styles.textLocation}>{park.location}</Text>
      </View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <SafeAreaView style={styles.containerRow}>
        <ScrollView horizontal={true}>
          <FlatList data={photos} renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableWithoutFeedback onPress={() => navigation.push("Photos", { photos })}>
                <Image style={styles.imageRow} source={{ uri: item.src }} />
              </TouchableWithoutFeedback>
            </View>
          )} numColumns={20} keyExtractor={(item, index) => index} />
        </ScrollView>
      </SafeAreaView>
      <TouchableWithoutFeedback onPress={() => navigation.push("Edit", { park })}>
        <Image style={styles.imageEdit} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Pencil-icon.gif" }} />
      </TouchableWithoutFeedback>
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
    flex: 0.9,
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
    width: 120,
    height: 120,
    borderRadius: 90,
  },
  video: {
    alignSelf: 'center',
    width: 300,
    height: 180,
  },
  imageRow: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  imageEdit: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: "87%",
    left: "80%",
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
