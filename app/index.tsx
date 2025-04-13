// app/index.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/Notes';

interface Note {
  id: string;
  text: string;
  createdAt: { seconds: number };
}

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NoteForm />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteItem note={item} />}
      />
    </View>
  );
}