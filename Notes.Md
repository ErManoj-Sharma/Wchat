# Versions: 
```
node -v 
v22.12.0
```
```
npm -v
10.9.0
```
# make a blank react project
```
npx create-expo-app@latest --template blank
```
# Added Support for web 
```
npx expo install react-dom react-native-web @expo/metro-runtime
```
# add expo router
https://docs.expo.dev/router/installation/#manual-installation
```
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```
```javascript
// package.json
{
  "main": "expo-router/entry"
}
```
```json
// app.json
{
  "scheme": "your-app-scheme"
}
```
```
npx expo install react-native-web react-dom
```
```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```
```javascript
// Restart server
npx expo start --tunnel --clear
```
# add native paper
https://callstack.github.io/react-native-paper/docs/guides/getting-started/

```
npm install react-native-paper react-native-safe-area-context react-native-vector-icons
``` 
```javascript
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
```
```javascript
// Main.js
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/App';

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
```
```javascript
//  app/index.js
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>This file in app/index.js</Text>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
# add native wind 
```
npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
```
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
```javascript
// global.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```
```javascript
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```
```
app/_layout.js
// Import your global CSS file
import "../global.css";
```
# expo app to apk build
```
npm install -g eas-cli
```
```
// Login expo account
eas login
```
```
eas build:configure
```
```
eas build --platform android
```
```javascript
// preview build - it can be downloaded as apk
eas build -p android --profile preview 
```