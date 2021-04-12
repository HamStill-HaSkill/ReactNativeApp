import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/config';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


const Markers = (props) => {

    let [park, setPark] = useState([]);
    
    const navigation = useNavigation();
    
    useEffect( () => {
        setPark(props.parksData)
    }, [props]);

    let getMarkers = () => {
         park.map((item) => {
        <Marker
            key={item.id}
            coordinate={item.geo}
            title={item.name}
            description={item.description} onPress={() => navigation.push("Detail", {item})}/> 
        })}

    return (
        <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE}
        showsUserLocationinitialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}>
            {getMarkers()}
        </MapView>
    )
};
export default Markers;

const styles = StyleSheet.create({

});
