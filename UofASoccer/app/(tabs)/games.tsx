import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../../services/firebase';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { format, addDays, isToday, isSameDay } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

//  we define the type here, beacuse typescript needs to know the type of game before it can be used.
type Game = {
  id: string;
  [key: string]: any;
};

export default function GamesScreen() {
  // we use react hooks here to save the state, which can be updated later.
  const [games, setGames] = useState<Game[]>([]); 
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());  //new date saves the today's date.
  // Date is built in javascript date object
  const router = useRouter();

  // Generate dates for the next 5 days, using stackoverflow.
  const dates = Array.from({ length: 5 }).map((_, i) => addDays(new Date(), i));

  // this runs when the selectedDate changes, its like watch the variable selectedDate rerun this block 
  // whenever it chnamges
  useEffect(() => {
    // now we have to reset the hours for start of day and end of day becuase when we run the query
    // in the firebase, we want to retreive all th games starting from 12:00 am till 11:59 on that day.
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // the query where we filer by date and sort it in ascending order.
    const gamesRef = collection(db, 'games');
    const q = query(
      gamesRef,
      where('Date', '>=', startOfDay),
      where('Date', '<=', endOfDay),
      orderBy('Date', 'asc')
    );

    // the realtime listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const gamesList: Game[] = [];
      querySnapshot.forEach((doc) => {
        gamesList.push({ id: doc.id, ...doc.data() });
      });
      setGames(gamesList);
    });

    return () => unsubscribe();
  }, [selectedDate]);

  const renderGame = ({ item }: { item: Game }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`./gamedetails/${item.id}`)}
    >
      <View style={styles.gameHeader}>
        <Text style={styles.gameTime}>
          {item.Date.toDate().toLocaleTimeString([])}
        </Text>
        <View style={styles.playersBadge}>
          <Text style={styles.playersText}>{item.Players?.length || 0} players</Text>
        </View>
      </View>
      <Text style={styles.description}>{item.Description || 'No description provided.'}</Text>
      <Text style={styles.location}>{item.Location || 'Location not specified'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Discover</Text>
      
      {/* Search placeholder */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Search games</Text>
      </View>
      
      {/* Date selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datesContainer}
      >
        {dates.map((date) => (
          <TouchableOpacity
            key={date.toString()}
            style={[
              styles.dateButton,
              isSameDay(date, selectedDate) && styles.selectedDateButton
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={[
              styles.dateWeekday,
              isSameDay(date, selectedDate) && styles.selectedDateText
            ]}>
              {format(date, 'EEE')}
            </Text>
            <Text style={[
              styles.dateDay,
              isSameDay(date, selectedDate) && styles.selectedDateText
            ]}>
              {format(date, 'd')}
            </Text>
            {isToday(date) && <View style={styles.todayIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Games list or empty state */}
      {games.length > 0 ? (
        <FlatList
          data={games}
          renderItem={renderGame}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Quiet day on the field.</Text>
          <Text style={styles.emptyText}>
            No games here today—or maybe not just yet. Tell us where and when you'd play,
            and help us bring the action to you.
          </Text>
          <Text style={styles.emptySubtext}>Help us grow in your city</Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => router.push('/creategame')}
      >
        <Text style={styles.createButtonText}>Create New Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginTop: 16,
    marginBottom: 20,
  },
  searchContainer: {
    backgroundColor: '#f2f2f7',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  searchText: {
    color: '#8e8e93',
    fontSize: 16,
  },
  datesContainer: {
    paddingBottom: 16,
    paddingHorizontal: 4,
  },
  dateButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 12,
    height: 70
  },
  selectedDateButton: {
    backgroundColor: '#007AFF',
  },
  dateWeekday: {
    fontSize: 14,
    color: '#8e8e93',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  selectedDateText: {
    color: '#fff',
  },
  todayIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gameTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  playersBadge: {
    backgroundColor: '#f2f2f7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  playersText: {
    fontSize: 14,
    color: '#8e8e93',
  },
  description: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#8e8e93',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#8e8e93',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  createButton: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    left: 16,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});