# @expo/ui Host loses its safe area when it mounts during a repeat modal presentation

A `Host` that mounts while a `fullScreenModal` is being presented, the second or later time a modal is presented in the session, renders as if it had no safe area: the hosted `List` starts under the status bar and the large title. The first presentation is fine.

## Steps

```sh
bun install
npx expo run:ios
```

1. Tap **Open A**. The rows start below "Screen A".
2. Close it, tap **Open B**, close it, tap **Open A** again. Row 1 is now under the status bar and the large title.

Without touch input: `xcrun simctl launch booted dev.brentvatne.hostsafearearepro -sequence a,b,a` runs the same steps (the last modal stays open).

## What the screen does

`components/HostedList.tsx` shows a loading `Host`, then replaces it with a new `Host` (a different `key`) 400 ms later, like a screen with a loading placeholder component. The new `Host` mounts while the modal is still animating in.

- `-reuseHost YES` keeps one `Host` for both states: no bug, because no new `Host` mounts.
- `-swapDelay <ms>` changes when the new `Host` mounts. Mounting at 0 ms or after the presentation finishes (about 1000 ms) shows no bug.

## Versions

Expo SDK 58 (`expo` 58.0.6), `@expo/ui` 58.0.14, `expo-router` 58.0.16, `react-native-screens` 4.28.0, React Native 0.88.0-rc.3, iOS 27.0 simulator.

Screenshots are in `pr-evidence/`.
