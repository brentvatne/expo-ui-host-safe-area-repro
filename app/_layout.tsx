import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Host safe area', headerLargeTitle: true }} />
      <Stack.Screen name="a" options={{ presentation: 'fullScreenModal', headerShown: false }} />
      <Stack.Screen name="b" options={{ presentation: 'fullScreenModal', headerShown: false }} />
    </Stack>
  );
}
