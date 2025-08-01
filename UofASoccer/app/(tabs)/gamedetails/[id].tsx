// dynamic route that loads based on the game's ID

import { useLocalSearchParams } from 'expo-router';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '@/services/firebase';
import {doc, getDoc} from "firebase/firestore"
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';


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
    <View style={styles.container}>
      {game ? (
        <>
          <Text style={styles.title}>Game Details</Text>
          <Text style={styles.detail}>📅 Date: {game.Date?.toDate().toDateString() || 'N/A'}</Text>
          <Text style={styles.detail}>📍 Location: {game.Location || 'N/A'}</Text>
          <Text style={styles.detail}>👥 Players: {game.Players?.length || 0}</Text>
          <Text style={styles.detail}>📝 Description: {game.Description || 'No description'}</Text>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading game details...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});

