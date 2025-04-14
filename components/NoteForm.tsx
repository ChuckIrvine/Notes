// components/NoteForm.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

const NoteForm: React.FC = () => {
  const [noteText, setNoteText] = useState('');
  const router = useRouter();

  const handleAddNote = async () => {
    if (noteText.trim()) {
      try {
        await addDoc(collection(db, 'notes'), {
          text: noteText,
          createdAt: new Date(),
          userId: auth.currentUser?.uid,
        });
        setNoteText('');
        alert('Note added successfully!');
      } catch (error) {
        console.error('Error adding note:', error);
        alert('Failed to add note.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out.');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="Enter your note"
        value={noteText}
        onChangeText={setNoteText}
        mode="outlined"
        multiline
        style={{ marginBottom: 16 }}
      />
      <Button mode="contained" onPress={handleAddNote} style={{ marginBottom: 8 }}>
        Add Note
      </Button>
      <Button mode="outlined" onPress={handleLogout}>
        Log Out
      </Button>
    </View>
  );
};

export default NoteForm;