// here we create the game.

import React from "react";
import { useEffect,useState } from "react";
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

// ask for user input for date and time and description for the game
//  create an item in the games collection
export default function CreateGame() {
    // call this when create button is pressed.
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    const HandleCreateButton = () => {

    }
return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.formContainer}>
                <Text style={styles.title}>Create New Game</Text>
                
                <Text style={styles.label}>Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#999"
                    value={date}
                    onChangeText={setDate}
                    keyboardType="numbers-and-punctuation"
                />

                <Text style={styles.label}>Time</Text>
                <TextInput
                    style={styles.input}
                    placeholder="HH:MM AM/PM"
                    placeholderTextColor="#999"
                    value={time}
                    onChangeText={setTime}
                    keyboardType="numbers-and-punctuation"
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="What's this game about?"
                    placeholderTextColor="#999"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={HandleCreateButton}
                >
                    <Text style={styles.buttonText}>Create Game</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    formContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        marginLeft: 5,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#4a80f0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#4a80f0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

// it should return the UI where the user is given an option to enter 
// date and time. it should be very user friendly.
// Once the details have been input w use
