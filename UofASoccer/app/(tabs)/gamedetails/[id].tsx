// dynamic route that loads based on the game's ID

import { useLocalSearchParams } from 'expo-router';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '@/services/firebase';
import {doc, getDoc} from "firebase/firestore"
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions} from 'react-native';


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
  <View style = {styles.container}>
    <ImageBackground 
    source={require('../../../assets/images/soccer.jpeg')} 
    style = {styles.footballGround} >
    </ImageBackground>

    <Text style = {styles.Players}>
      Who's Playing
    </Text>

    <Text style = {styles.WhereWePlayText}>
      Where We'll Play
      We can play on the ground next to the VVC complex, or on Lister Field
      <ImageBackground 
      source={require('../../../assets/images/Map.png')} 
      style = {styles.footballGround} >
      </ImageBackground>
    </Text>
      
    </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  
  footballGround: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  Players: {
    flex: 1,

  },
  WhereWePlayText: {
    flex: 1,
  },

  Map: {
    flex: 1,
    height: '35%',
    width: '100%'
  },


})

