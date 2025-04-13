// components/NoteItem.tsx
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { IconButton } from 'react-native-paper';

interface Note {
  id: string;
  text: string;
  createdAt: { seconds: number };
}

const NoteItem: React.FC<{ note: Note }> = ({ note }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'notes', note.id));
      alert('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note.');
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
          icon="delete"
          color="#ff0000"
          size={24}
          onPress={handleDelete}
        />
      </Card.Content>
    </Card>
  );
};

export default NoteItem;