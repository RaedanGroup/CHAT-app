# Native Chat App
:exclamation: **Important:** This application is currently under active development. The information provided here reflects both the project's goals and its current state. :exclamation:

## About The Project

The Native Chat App is a mobile application built with React Native, designed to provide users with a sophisticated chat interface that includes features for sharing images and location data. Optimized for both Android and iOS devices, this app leverages Expo for development and Google Firestore for storing chat messages, ensuring a seamless user experience.

### Features

- **Chat Interface**: Offers a user-friendly environment for entering chat rooms and starting conversations with friends and family.
- **Message Exchange**: Enables the sending of messages for efficient communication.
- **Image Sharing**: Allows users to share images either from their phone's library or directly through the camera app.
- **Location Sharing**: Provides the capability to share precise location data within the chat.
- **Offline Access**: Ensures messages can be read offline, so no conversation is missed.
- **Accessibility**: The app is fully accessible, including compatibility with screen readers, to accommodate users with visual impairments.
- **Network Handling**: Incorporates network status checks to manage data fetching and Firestore network access based on connectivity.

### Technical Requirements

- **React Native**: For cross-platform mobile app development.
- **Expo**: Used for efficient development and testing across Android and iOS.
- **Google Firestore Database**: Secures chat conversations in a cloud database.
- **Firebase Authentication**: Enables anonymous user authentication for privacy.
- **Local Storage**: Facilitates local storage of chat conversations for offline access.
- **Firebase Cloud Storage**: Manages the storage and retrieval of image content.
- **Gifted Chat**: Builds the chat interface and functionality with ease.
- **Custom Components**: Includes custom actions for image and location sharing, enhancing the chat experience.
- **Comprehensive Comments**: The codebase is thoroughly commented to aid understanding and collaboration.

## Getting Started
Setting up the Native Chat App requires a few key steps, including configuring the development environment, setting up the database, and installing necessary libraries. Follow these steps to get started:

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI

This project uses Expo for development. If you haven't already, install Expo CLI globally:
   ```
   npm install -g expo-cli
   ```

### Database Configuration
This app uses Firebase Firestore for real-time data storage and Firebase Authentication for user management.

1. Firebase Project: Create a new project in the Firebase console (https://console.firebase.google.com/).

2. Firestore Database: Within your Firebase project, initialize Firestore Database in test mode.

3. Firebase Authentication: Enable anonymous authentication in the Firebase console under Authentication > Sign-in method.

4. Configuration: Locate your Firebase project's configuration object. This can be found in Project settings > General > Your apps > Firebase SDK snippet > Config. It looks like this:
```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```
5. Update the 'firebaseConfig.js' in your project with the above configuration object.

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/RaedanGroup/CHAT-app
   ```
2. Navigate into the project directory

3. Install NPM packages:
   ```
   npm install
   ```
   This command installs all the dependencies listed in the package.json file, including libraries for Firebase, chat UI, location, and image picking functionalities.
4. Start the Expo project:
   ```
   expo start
   ```
   This command will launch the Expo developer tools in your default web browser, where you can run the app on iOS/Android simulators or your physical device by scanning the QR code via the Expo Go App.
   
### Testing Environment
**Android Studio** or **Xcode**: For local testing on simulators, install Android Studio (for Android) or Xcode (for iOS). Follow the installation guides on their respective websites.

### Usage
To use the Native Chat App, launch the Expo project and follow the on-screen instructions to enter a chat room. Within the chat, you can send messages, share images, and disclose your location with participants. The app's accessibility features ensure a wide range of users can enjoy seamless communication.

### Accessibility Enhancements
The app includes several enhancements to improve accessibility, such as descriptive labels for screen readers, ensuring all users can navigate and utilize the app effectively.

### Network Awareness
Network handling capabilities allow the app to adapt to connectivity changes, offering offline support and intelligent syncing once the network is restored, ensuring a robust user experience even in fluctuating network conditions.