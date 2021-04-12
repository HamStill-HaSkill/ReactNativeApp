import React, { useState, useEffect, Component } from 'react';
import { firebase } from '../firebase/config';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Markers from './Markers';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

class Map extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            props: props, 
            parksData: [],
            };
      }
    

    // let [parksData, setParksData] = useState([]);

  
    componentDidMount() {
        const entityRef = firebase.firestore().collection('parks')
        const userID = this.state.props.user.id;
        entityRef.where("userID", "==", userID).onSnapshot(query => {
                  let parks = [];
                  query.forEach(park => {
                      let data = park.data();
                      parks.push({
                        id: park.id, 
                        src: data.src,
                        name: data.name,
                        geo: data.geo,
                        description: data.description,
                        loacation: data.loacation,
                      })
                  });
                  this.setState({parksData: parks})
              },
              error => {
                  console.log(error)
              }
          )
    }

    getMarkers = () => {
        const { navigation } = this.props;
        return this.state.parksData.map((item) => <Marker
                key={item.id}
                coordinate={{latitude: item.geo.latitude, longitude: item.geo.longitude}}
                title={item.name}
                description={item.description} onPress={() => navigation.navigate("Detail", {item})}/>
        );
    }

    render() {
        return (
        <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE}
        showsUserLocationinitialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}>
            {this.getMarkers()}
        </MapView>
    );
}
};
export default Map;

const styles = StyleSheet.create({

});
