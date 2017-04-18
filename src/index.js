import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Routing from './navigation/Routing';

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

    componentDidMount() {
        //SplashScreen.hide();
    }

  render() {
    return (
      <Routing />
    );
  }
}
