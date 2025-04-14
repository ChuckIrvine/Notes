// components/ActionItemForm.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ActionItemForm: React.FC = () => {
  const [itemText, setItemText] = useState('');

  const handleAddItem = async () => {
    if (itemText.trim()) {
      try {
        await addDoc(collection(db, 'actionItems'), {
          text: itemText,
          createdAt: new Date(),
          completed: false,
        });
        setItemText('');
        alert('Action item added successfully!');
      } catch (error) {
        console.error('Error adding action item:', error);
        alert('Failed to add action item.');
      }
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="Enter action item"
        value={itemText}
        onChangeText={setItemText}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      <Button mode="contained" onPress={handleAddItem}>
        Add Action Item
      </Button>
    </View>
  );
};

export default ActionItemForm;