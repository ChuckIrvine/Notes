// app/(tabs)/action-items.tsx
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ActionItemForm from '../../components/ActionItemForm';
import ActionItem from '../../components/ActionItem';

interface ActionItemInterface {
  id: string;
  text: string;
  createdAt: { seconds: number };
  completed: boolean;
}

export default function ActionItemsScreen() {
  const [items, setItems] = useState<ActionItemInterface[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'actionItems'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ActionItemInterface[];
      setItems(itemsData);
    });

    return () => unsubscribe();
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