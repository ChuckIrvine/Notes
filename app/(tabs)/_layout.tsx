// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  console.log('TabsLayout: Starting route setup');
  console.log('Tabs routes: notes, action-items');
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="notes"
    >
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="note" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="action-items"
        options={{
          title: 'Action Items',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="check-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}