import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { firebase } from '../firebase/config';
import { StyleSheet, TextInput, Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

let Register = (props) => {

  const navigation = useNavigation();
  
  let [login, setLogin] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [age, setAge] = useState();
  let [phone, setPhone] = useState('+375');

  let onRegisterPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          login,
          email,
          age,
          phone,
        };
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            props.setIsLogin(true);
            props.setUser(data);
            navigation.navigate('OverviewNavigator');;
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.text} placeholder="Login" value={login} onChangeText = {setLogin} />
      <TextInput secureTextEntry={true} style={styles.text} 
                                  placeholder="Password" value={password} onChangeText = {setPassword} />
      <TextInput style={styles.text} placeholder="Email" value={email} onChangeText = {setEmail} />
      <TextInput style={styles.text} placeholder="Phone" value={phone} onChangeText = {setPhone} />
      <TextInput style={styles.text} placeholder="Age"   value={age} onChangeText = {setAge} />
      <Button title="Register" color="#333333" onPress={onRegisterPress}/>

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

export default Register;