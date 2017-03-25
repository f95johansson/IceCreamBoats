import IceCreamBoats from './src/index';
import React, { Component } from 'react'
import MapView from 'react-native-maps'
import * as firebase from 'firebase'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDvYo4vJshvVB9wzXWBwfSWdgBUQsg_qgE",
  authDomain: "icecreamboats-6da6d.firebaseapp.com",
  databaseURL: "https://icecreamboats-6da6d.firebaseio.com",
  storageBucket: "icecreamboats-6da6d.appspot.com",
  messagingSenderId: "873538806157"
};
firebase.initializeApp(config)


export default class IceCreamBoats extends Component {
      constructor() {
        super();
      }

      render() {
        return (
          <MapView
            style={ styles.map }
          />
        );
      }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
>>>>>>> maps fixed

AppRegistry.registerComponent('IceCreamBoats', () => IceCreamBoats);
