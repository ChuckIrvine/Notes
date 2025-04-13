// components/NoteForm.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const NoteForm: React.FC = () => {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = async () => {
    if (noteText.trim()) {
      try {
        await addDoc(collection(db, 'notes'), {
          text: noteText,
          createdAt: new Date(),
        });
        setNoteText('');
        alert('Note added successfully!');
      } catch (error) {
        console.error('Error adding note:', error);
        alert('Failed to add note.');
      }
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
      <Button mode="contained" onPress={handleAddNote}>
        Add Note
      </Button>
    </View>
  );
};

export default NoteForm;