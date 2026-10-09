import { Host } from '@expo/ui';
import { Button, List, Section, Text } from '@expo/ui/swift-ui';
import { listStyle } from '@expo/ui/swift-ui/modifiers';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Settings } from 'react-native';

// Launch argument for screenshots without touch input: -sequence a,b,a opens each modal, closes it, then opens the next.
export default function Index() {
  useEffect(() => {
    const steps = String(Settings.get('sequence') ?? '').split(',').filter(Boolean);
    steps.forEach((id, i) => {
      setTimeout(() => router.push(`/${id}` as never), 1000 + i * 4000);
      if (i < steps.length - 1) setTimeout(() => router.dismissTo('/'), 3500 + i * 4000);
    });
  }, []);

  return (
    <Host style={{ flex: 1 }}>
      <List modifiers={[listStyle('insetGrouped')]}>
        <Section title="Open A, close it, open B, close it, then open A again">
          <Button label="Open A" onPress={() => router.push('/a')} />
          <Button label="Open B" onPress={() => router.push('/b')} />
        </Section>
      </List>
    </Host>
  );
}
