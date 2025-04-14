// app/(tabs)/notes.tsx
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import NoteForm from '../../components/NoteForm';
import NoteItem from '../../components/NoteItem';

interface Note {
  id: string;
  text: string;
  createdAt: { seconds: number };
  userId: string;
}

export default function NotesScreen() {
  console.log('NotesScreen: Component mounted');
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (auth.currentUser) {
      console.log('NotesScreen: User authenticated, setting up Firestore query for UID:', auth.currentUser.uid);
      const q = query(
        collection(db, 'notes'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Note[];
        console.log('NotesScreen: Received notes data:', notesData.length);
        setNotes(notesData);
      }, (error) => {
        console.error('NotesScreen: Firestore error:', error);
      });

      return () => {
        console.log('NotesScreen: Unsubscribing from Firestore');
        unsubscribe();
      };
    } else {
      console.log('NotesScreen: No authenticated user');
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NoteForm />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteItem note={item} />}
      />
    </SafeAreaView>
  );
}