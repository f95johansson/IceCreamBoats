import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabBar from './navigation/navigation';

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
  render() {
    return (
      <TabBar />
    );
  }
}

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },*/
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container: {
    // jshint ignore:start
   ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end',
   alignItems: 'center',
   },
   map: {
     ...StyleSheet.absoluteFillObject,
   // jshint ignore:end
   },
});