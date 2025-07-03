// here i want to give the user an option to signup or login.
// first thing would b eto import firebase and react libraires.
import React, { useRef } from "react";
import { useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User}
 from "firebase/auth";
import { useRouter } from 'expo-router';


//  this grabs the firebase auth object that we made earlier in the config file.
import {auth} from "../../services/firebase";

// I am setting the state for email and password as empty strings, once the user
// enters the values, setEmail and setPassword are basically functions that would be called 
// to set the values for the email and password.
export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter()

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
            router.push("/games")
        })
        .catch((error) => {
            setErrorMessage(error.message)
        })
    }
// View is like a <div> in html.

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >

                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>Sign in or create an account</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />

                {errorMessage !== '' && (
                    <Animated.Text style={styles.error}>{errorMessage}</Animated.Text>
                )}

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleLogin}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={handleSignUp}
                    activeOpacity={0.8}
                >
                    <Text style={styles.secondaryButtonText}>Sign Up</Text>
                </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
    },
    content: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#2d3436',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#636e72',
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#dfe6e9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    primaryButton: {
        backgroundColor: '#0984e3',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#0984e3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        elevation: 3,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0984e3',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButtonText: {
        color: '#0984e3',
        fontSize: 16,
        fontWeight: '600',
    },
    error: {
        color: '#d63031',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 14,
    },
});





