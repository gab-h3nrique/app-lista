This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android

# run this to build apk for android
npm run build
```

### For iOS

```bash

# enter /ios folder
cd ios

# run this if throw an error
brew link --overwrite cocoapods

# using npm
npx pod-install

# using npm
npm run ios


# run this inside /ios if throw an error when 'npm run ios'
rm -rf Pods && pod install    

```

###### FOLOW THIS STEPS FOR BOTH OS (ANDROID/IOS) ######

```bash
# 1
npm start

# 2 
open android studio e start the app

# 3
# if this throw an error on app "red background erros", close app e open again

# 4 - before you run this command, open the app in device (emulator) and run this code and press D in the terminal where you have been runned 'npm run start' and close without choose nothing
npm run devtools

###### BUILD ######

npm run build