import React, { useState, useEffect } from 'react';
import { firebase } from './firebase/config';
import { SafeAreaView, StyleSheet, View, FlatList, Image, Button, TouchableWithoutFeedback, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Detail from './Detail/Detail';

const Overview = (props) => {
  let [parksData, setParksData] = useState([]);
  let [isDetail, setIsDetail] = useState(false);

  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const entityRef = firebase.firestore().collection('parks')
  const userID = props.user.id

  useEffect(() => {
      entityRef.where("userID", "==", userID).onSnapshot(query => {
                let parks = [];
                query.forEach(park => {
                    let data = park.data();
                    parks.push({
                      id: park.id, 
                      src: data.src,
                      name: data.name,
                      description: data.description,
                      loacation: data.loacation,
                    })
                });
                setParksData(parks);
                console.log(parks);
            },
            error => {
                console.log(error)
            }
        )
  }, [])

  let addPark = () => {
    let data = {
      name: "National park",
      src: "https://cf.bstatic.com/data/xphoto/1182x887/324/32450911.jpg?size=S",
      userID,
      description: "This is very big park. It's amupark!!!",
      loacation: "Minsk, Belarus",
    }
    entityRef.add(data).catch((error) => {
        alert(error)
    });

  }
  return (
      <SafeAreaView style={styles.container}>
        <FlatList data={parksData} renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableWithoutFeedback onPress={() => navigation.push("Detail", {item})}>
                <View style={styles.itemContainer}>
                  <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                  <Text style={styles.textName}>{item.name}</Text>
                  <Text style={styles.textLocation}>{item.loacation}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )} numColumns={3} keyExtractor={(item, index) => index} />
          <Button title="add" onPress={addPark}/>
      </SafeAreaView>
  );
};
export default Overview;

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
    borderRadius: 90,
  },
  itemContainer: {
    alignItems: 'center',
    borderColor: 'gray',
    borderStyle: 'solid',
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
    color: 'gray',
    textAlign: 'center',
  }
});
