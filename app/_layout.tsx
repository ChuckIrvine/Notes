// app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Text, View } from 'react-native';

export default function RootLayout() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    console.log('RootLayout: Setting up auth listener');
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('RootLayout: Auth state changed:', currentUser ? 'Logged in' : 'Logged out');
      setUser(currentUser);
      setInitializing(false);
    }, (error) => {
      console.error('RootLayout: Auth error:', error);
      setInitializing(false);
    });

    return () => {
      console.log('RootLayout: Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!initializing) {
      console.log('RootLayout: Navigating based on user:', user ? 'Logged in' : 'Logged out');
      if (user) {
        router.replace('/(tabs)/notes');
      } else {
        router.replace('/login');
      }
    }
  }, [initializing, user, router]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    </PaperProvider>
  );
}