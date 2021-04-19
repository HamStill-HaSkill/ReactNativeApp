import React, {useState, useEffect} from 'react';
import { StyleSheet, Text } from 'react-native';
import Settings from './Settings';


const Stack = createStackNavigator();

const T = (props) => {  
    
    let [style, setStyle] = useState();
    return ( 
        <Text style={props.styles}>{props.text}</Text> 
    );
}

export default T;

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