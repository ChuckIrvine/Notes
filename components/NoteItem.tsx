// components/NoteItem.tsx
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

interface Note {
  id: string;
  text: string;
  createdAt: { seconds: number };
}

const NoteItem: React.FC<{ note: Note }> = ({ note }) => (
  <Card style={{ margin: 8 }}>
    <Card.Content>
      <Title>{note.text}</Title>
      <Paragraph>
        {new Date(note.createdAt.seconds * 1000).toLocaleString()}
      </Paragraph>
    </Card.Content>
  </Card>
);

export default NoteItem;