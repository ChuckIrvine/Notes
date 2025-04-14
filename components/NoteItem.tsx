// components/NoteItem.tsx
import React, { useState } from 'react';
import { Card, Title, Paragraph, IconButton, Portal, Modal, TextInput, Button } from 'react-native-paper';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Alert, View } from 'react-native';

interface Note {
  id: string;
  text: string;
  createdAt: { seconds: number };
  userId: string;
}

const NoteItem: React.FC<{ note: Note }> = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'notes', note.id));
              alert('Note deleted successfully!');
            } catch (error) {
              console.error('Error deleting note:', error);
              alert('Failed to delete note.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = async () => {
    if (editedText.trim()) {
      try {
        await updateDoc(doc(db, 'notes', note.id), {
          text: editedText,
        });
        setIsEditing(false);
        alert('Note updated successfully!');
      } catch (error) {
        console.error('Error updating note:', error);
        alert('Failed to update note.');
      }
    } else {
      alert('Note cannot be empty.');
    }
  };

  return (
    <Card style={{ margin: 8 }}>
      <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Card.Content style={{ flex: 1 }}>
          <Title>{note.text}</Title>
          <Paragraph>
            {new Date(note.createdAt.seconds * 1000).toLocaleString()}
          </Paragraph>
        </Card.Content>
        <IconButton
          icon="pencil"
          iconColor="#007bff"
          size={24}
          onPress={() => setIsEditing(true)}
          accessibilityLabel="Edit note"
        />
        <IconButton
          icon="delete"
          iconColor="#ff0000"
          size={24}
          onPress={handleDelete}
          accessibilityLabel="Delete note"
        />
      </Card.Content>

      <Portal>
        <Modal
          visible={isEditing}
          onDismiss={() => setIsEditing(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            margin: 20,
            borderRadius: 8,
          }}
        >
          <TextInput
            label="Edit note"
            value={editedText}
            onChangeText={setEditedText}
            mode="outlined"
            multiline
            style={{ marginBottom: 16 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button mode="outlined" onPress={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleEdit}>
              Save
            </Button>
          </View>
        </Modal>
      </Portal>
    </Card>
  );
};

export default NoteItem;