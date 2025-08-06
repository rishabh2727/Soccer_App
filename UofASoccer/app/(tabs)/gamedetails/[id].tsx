// dynamic route that loads based on the game's ID

import { useLocalSearchParams } from 'expo-router';
import { arrayUnion, collection, getCountFromServer } from 'firebase/firestore';
import firebase, { db } from '@/services/firebase';
import {doc, getDoc, updateDoc} from "firebase/firestore"
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { Button } from '@react-navigation/elements';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';
import { getAuth } from 'firebase/auth';
import { Alert } from 'react-native';


// for getting dimensions of the window, trying to place a football field on 1/4th of the window

const {height} = Dimensions.get('window')
// this function is responsible for displaying the game information here, thats all.
export default function gameDetail() {

    // understanding async and await, 
    // you can use await only inside an async function.
    // async always returns a promise. it needs to be resolved.

    // this is the id of the game clicked on the games screen.
    const { id } = useLocalSearchParams();
    const [game, setGame] =  useState<any>(null)
    const [isJoined, setIsJoined] = useState(false);
    
    useEffect(() => {
        if (!id) return ;
        async function fetchGame(){
                // get the reference to the document with the id equal to "id" from the database called games 
            const docRef = doc(db, "games", id as string)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()){
                console.log(docSnap.data())
                setGame(docSnap.data())
            }
            else{
                console.log("Document does not exist")
            }
        }
        // here we call the async function defined
        fetchGame();
        // rerun this effect, when the id changes.
    },[id]);
// need to know how to write react-native UIs

    // Function to handle joining the game
// Function to handle joining the game
const handleJoinGame = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        console.log("No user is logged in");
        return;
    }

    const playerName = currentUser.displayName || currentUser.email; 

    const docRef = doc(db, "games", id as string);

    try {
        // Update the 'Players' array in Firestore
        await updateDoc(docRef, {
            Players: arrayUnion(playerName), 
        });

        // Set the state to reflect that the user has joined
        setIsJoined(true);

        // Show an alert that the player has successfully joined the game
        Alert.alert("Success!", "You've joined the game!");
    } catch (error) {
        console.log("Error joining game: ", error);
    }
};


    return (
      <ScrollView>
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/images/soccer.jpeg')}
                style={styles.footballGround}
            >
            </ImageBackground>

            {/* Players List */}
            <Text style={styles.Players}>
                Who's Playing
            </Text>

            {/* Player names displayed in two columns */}
            <View style={styles.playersList}>
                {game?.Players?.map((player: string, index: number) => (
                    <View key={index} style={styles.playerItem}>
                        <Text style={styles.playerNumber}>{index + 1}.</Text>
                        <Text style={styles.playerName}>{player}</Text>
                    </View>
                ))}
            </View>

            {/* Where We'll Play */}
            <Text style={styles.WhereWePlayText}>
                Where We'll Play
            </Text>
            <Text style = {styles.Place}>
                We can play on the ground next to the VVC complex, or on Lister Field
            </Text>

            {/* Map */}
            <ImageBackground
                source={require('../../../assets/images/Map.png')}
                style={styles.Map}
            >
            </ImageBackground>

            {/* Join Game Button */}
                <TouchableOpacity 
                    style={styles.JoinGameButton} 
                    onPress={handleJoinGame}
                    disabled={isJoined} // Disable the button if the user has already joined
                >
                    <Text style={styles.JoinGame}>
                        {isJoined ? "You've joined the game!" : "Join Game"}
                    </Text>
                </TouchableOpacity>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    footballGround: {
        height: '75%',
        width: '100%',
    },
    Players: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',  // Center the "Who's Playing" text
        color: '#333',        // Dark color for better readability
    },
    playersList: {
        flexDirection: 'row',  // Align the player items horizontally
        flexWrap: 'wrap',      // Allow players to wrap to the next line
        justifyContent: 'center',  // Center items horizontally
        alignItems: 'center',  // Center items vertically
        marginTop: 20,         // Add space between title and players
    },
    playerItem: {
        backgroundColor: '#f0f0f0',  // Light gray background for a modern look
        width: '45%',                // Each player takes up 45% of the container's width
        margin: 10,                  // Space between the player cards
        padding: 15,                 // Padding inside each player card
        borderRadius: 12,            // Rounded corners for a modern look
        shadowColor: '#000',         // Shadow color for the card effect
        shadowOffset: { width: 0, height: 2 },  // Shadow position
        shadowOpacity: 0.1,          // Light shadow for modern effect
        shadowRadius: 5,             // Soft shadow blur
        elevation: 3,                // Elevation for Android devices to create the shadow effect
        justifyContent: 'center',    // Center content inside each card
        alignItems: 'center',        // Center content inside each card
    },
    playerNumber: {
        fontSize: 18,
        fontWeight: 'bold',          // Make the number bold to stand out
        color: '#006400',            // Dark green for the number to give it prominence
    },
    playerName: {
        fontSize: 20,
        color: '#333',               // Dark color for the player name for better readability
        marginTop: 5,  
        fontFamily: 'Roboto', 
        fontWeight: 'bold',             // Space between the number and the name
    },
    WhereWePlayText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: '#006400',
        color: '#FFD700', 
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },

    Place : {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },

    Map: {
        width: '100%',
        height: 500, 
    },
    JoinGameButton: {
        backgroundColor: '#006400',  
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
        textAlign: 'center',

    },
    JoinGame: {
        color: '#FFD700', 
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

// Learning 3 things today. 
// To overlay the join game button, so we use position:absolute for styling.
// second, to use separate containers for structure, when I try to write UI
// I end up making the simplest version of the code possible, but it is better to 
// use separate containers for different UI sections, so we can ontrol how they are
// being displayed.
// optional chaining, so we can use ?. allows us to safely access the nested properties
// If game or game.Players exists, then we display it othrwise it would return undefined, 
// and do nothing.
// .map((player: string , index:number))