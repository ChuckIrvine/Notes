// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}