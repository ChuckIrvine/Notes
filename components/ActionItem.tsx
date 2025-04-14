// components/ActionItem.tsx
import React, { useState } from 'react';
import { Card, Title, Paragraph, IconButton, Portal, Modal, TextInput, Button, Checkbox } from 'react-native-paper';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Alert, View } from 'react-native';

interface ActionItem {
  id: string;
  text: string;
  createdAt: { seconds: number };
  completed: boolean;
}

const ActionItem: React.FC<{ item: ActionItem }> = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);

  const handleDelete = () => {
    Alert.alert(
      'Delete Action Item',
      'Are you sure you want to delete this action item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'actionItems', item.id));
              alert('Action item deleted successfully!');
            } catch (error) {
              console.error('Error deleting action item:', error);
              alert('Failed to delete action item.');
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
        await updateDoc(doc(db, 'actionItems', item.id), {
          text: editedText,
        });
        setIsEditing(false);
        alert('Action item updated successfully!');
      } catch (error) {
        console.error('Error updating action item:', error);
        alert('Failed to update action item.');
      }
    } else {
      alert('Action item cannot be empty.');
    }
  };

  const handleToggleComplete = async () => {
    try {
      await updateDoc(doc(db, 'actionItems', item.id), {
        completed: !item.completed,
      });
    } catch (error) {
      console.error('Error toggling action item:', error);
      alert('Failed to toggle action item.');
    }
  };

  return (
    <Card style={{ margin: 8 }}>
      <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          status={item.completed ? 'checked' : 'unchecked'}
          onPress={handleToggleComplete}
        />
        <Card.Content style={{ flex: 1 }}>
          <Title style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
            {item.text}
          </Title>
          <Paragraph>
            {new Date(item.createdAt.seconds * 1000).toLocaleString()}
          </Paragraph>
        </Card.Content>
        <IconButton
          icon="pencil"
          iconColor="#007bff"
          size={24}
          onPress={() => setIsEditing(true)}
          accessibilityLabel="Edit action item"
        />
        <IconButton
          icon="delete"
          iconColor="#ff0000"
          size={24}
          onPress={handleDelete}
          accessibilityLabel="Delete action item"
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
            label="Edit action item"
            value={editedText}
            onChangeText={setEditedText}
            mode="outlined"
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

export default ActionItem;