// dynamic route that loads based on the game's ID

import { useLocalSearchParams } from 'expo-router';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '@/services/firebase';
import {doc, getDoc} from "firebase/firestore"
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { Button } from '@react-navigation/elements';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';


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
            <Text>
                We can play on the ground next to the VVC complex, or on Lister Field
            </Text>

            {/* Map */}
            <ImageBackground
                source={require('../../../assets/images/Map.png')}
                style={styles.Map}
            >
            </ImageBackground>

            {/* Join Game Button */}
            <TouchableOpacity style={styles.JoinGameButton}>
                <Text style={styles.JoinGame}>Join Game</Text>
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
        fontSize: 30,
        fontWeight: 'bold', 
        marginVertical: 10,
         textAlign: 'center'
    },
    playersList: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        marginBottom: 50,
    },
    playerItem: {
        width: '25%',
        marginBottom: 10,
    },
    playerNumber: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    playerName: {
        fontSize: 16,
    },
    WhereWePlayText: {
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center', 
    },
    JoinGame: {
        color: '#FFD700', 
        fontSize: 18,
        fontWeight: 'bold',
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