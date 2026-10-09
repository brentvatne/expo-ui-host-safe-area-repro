import { Host } from '@expo/ui';
import { List, Text } from '@expo/ui/swift-ui';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Settings } from 'react-native';

const rows = Array.from({ length: 30 }, (_, i) => `Row ${i + 1}`);

// The screen shows a loading Host, then replaces it with a new Host once "data" arrives, like a screen with a loading
// placeholder component. The new Host mounts while the modal is still being presented.
// -swapDelay <ms> sets when the loaded Host mounts (default 400). -reuseHost YES keeps one Host for both states, which
// does not show the bug.
const swapDelay = Number(Settings.get('swapDelay') ?? 400);
const reuseHost = String(Settings.get('reuseHost') ?? '').toUpperCase() === 'YES';

export function HostedList() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), swapDelay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button icon="xmark" accessibilityLabel="Close" onPress={() => router.dismissTo('/')} />
      </Stack.Toolbar>
      <Host key={reuseHost ? 'host' : loaded ? 'loaded' : 'loading'} style={{ flex: 1 }}>
        <List>
          {loaded ? rows.map((row) => <Text key={row}>{row}</Text>) : <Text>Loading…</Text>}
        </List>
      </Host>
    </>
  );
}
