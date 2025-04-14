// app/(tabs)/action-items.tsx
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import ActionItemForm from '../../components/ActionItemForm';
import ActionItem from '../../components/ActionItem';

interface ActionItemInterface {
  id: string;
  text: string;
  createdAt: { seconds: number };
  completed: boolean;
  userId: string;
}

export default function ActionItemsScreen() {
  console.log('ActionItemsScreen: Component mounted');
  const [items, setItems] = useState<ActionItemInterface[]>([]);

  useEffect(() => {
    if (auth.currentUser) {
      console.log('ActionItemsScreen: User authenticated, setting up Firestore query for UID:', auth.currentUser.uid);
      const q = query(
        collection(db, 'actionItems'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const itemsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ActionItemInterface[];
        console.log('ActionItemsScreen: Received items data:', itemsData.length);
        setItems(itemsData);
      }, (error) => {
        console.error('ActionItemsScreen: Firestore error:', error);
      });

      return () => {
        console.log('ActionItemsScreen: Unsubscribing from Firestore');
        unsubscribe();
      };
    } else {
      console.log('ActionItemsScreen: No authenticated user');
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActionItemForm />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActionItem item={item} />}
      />
    </SafeAreaView>
  );
}