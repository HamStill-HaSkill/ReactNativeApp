import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { firebase } from '../firebase/config';
import { StyleSheet, TextInput, Button, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

let Login = (props) => {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const navigation = useNavigation();

  let onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .get()
          .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.")
              return;
            }
            const user = firestoreDocument.data();
            props.setUser(user);
            props.setIsLogin(true);
            navigation.navigate('OverviewNavigator');
          })
          .catch(error => {
            alert(error);
          });
      })
      .catch(error => {
        alert(error);
      })
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.text} placeholder="Email" value={email} onChangeText = {setEmail} />
      <TextInput secureTextEntry={true} style={styles.text} 
                            placeholder="Password" value={password} onChangeText = {setPassword} />
      <Button title="Login" color="#333333" onPress={onLoginPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    width: 200,
    marginVertical: 5,
    color: '#333333',
    fontSize: 15,
    marginVertical: 10,
  },
});

export default Login;