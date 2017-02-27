import React, { Component } from 'react'
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
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
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
});

AppRegistry.registerComponent('IceCreamBoats', () => IceCreamBoats);
