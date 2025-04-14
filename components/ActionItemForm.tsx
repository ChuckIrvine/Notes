// components/ActionItemForm.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

const ActionItemForm: React.FC = () => {
  const [itemText, setItemText] = useState('');
  const router = useRouter();

  const handleAddItem = async () => {
    if (itemText.trim()) {
      try {
        await addDoc(collection(db, 'actionItems'), {
          text: itemText,
          createdAt: new Date(),
          completed: false,
          userId: auth.currentUser?.uid,
        });
        setItemText('');
        alert('Action item added successfully!');
      } catch (error) {
        console.error('Error adding action item:', error);
        alert('Failed to add action item.');
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
        label="Enter action item"
        value={itemText}
        onChangeText={setItemText}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      <Button mode="contained" onPress={handleAddItem} style={{ marginBottom: 8 }}>
        Add Action Item
      </Button>
      <Button mode="outlined" onPress={handleLogout}>
        Log Out
      </Button>
    </View>
  );
};

export default ActionItemForm;