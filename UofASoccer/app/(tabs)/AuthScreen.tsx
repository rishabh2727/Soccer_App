// here i want to give the user an option to signup or login.
// first thing would b eto import firebase and react libraires.
import React from "react";
import { useEffect,useState} from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User}
 from "firebase/auth";

//  this grabs the firebase auth object that we made earlier in the config file.
import {auth} from "../../services/firebase"

// I am setting the state for email and password as empty strings, once the user
// enters the values, setEmail and setPassword are basically functions that would be called 
// to set the values for the email and password.
export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

// need to have a function which can run this.
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth,email,password)
        .then(() => {
            alert("SignUp Successful");
            setErrorMessage('')
        })
        .catch((error) => {
            setErrorMessage(error.message);
        })
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login Succesful")
            setErrorMessage('')
        })
        .catch((error) => {
            setErrorMessage(error.message)
        })
    }
// View is like a <div> in html.

return (
    <View style={styles.container}>
      <Text style={styles.title}>Login or Sign Up</Text>

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignUp} />

      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
}

// Simple styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
    


   


