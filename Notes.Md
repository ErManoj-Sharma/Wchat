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
