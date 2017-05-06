import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen';
import {
  StyleSheet,
  Text,
  View,
  //StatusBar,
} from 'react-native';
import Routing from './navigation/Routing';

//import OneSignal from 'react-native-onesignal'; // Import package from node modules

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDvYo4vJshvVB9wzXWBwfSWdgBUQsg_qgE",
  authDomain: "icecreamboats-6da6d.firebaseapp.com",
  databaseURL: "https://icecreamboats-6da6d.firebaseio.com",
  storageBucket: "icecreamboats-6da6d.appspot.com",
  messagingSenderId: "873538806157"
};
firebase.initializeApp(config);

export default class IceCreamBoats extends Component {
  // componentWillMount() {
  //   OneSignal.addEventListener('received', this.onReceived);
  //   OneSignal.addEventListener('opened', this.onOpened);
  //   OneSignal.addEventListener('registered', this.onRegistered);
  //   OneSignal.addEventListener('ids', this.onIds);
  // }
  //
  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  //   OneSignal.removeEventListener('registered', this.onRegistered);
  //   OneSignal.removeEventListener('ids', this.onIds);
  //
  // }
  //
  // onReceived(notification) {
  //   console.log("Notification received: ", notification);
  //
  // }

  // onOpened(openResult) {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  //
  // }
  //
  // onRegistered(notifData) {
  //   console.log("Device had been registered for push notifications!", notifData);
  //
  // }
  //
  // onIds(device) {
  //   console.log('Device info: ', device);
  //
  // }
  // componentDidMount() {
  //   SplashScreen.hide();
  // }

  render() {
    return (

        <Routing />
    );
  }
}
