import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';

export default class InputUpload extends Component {

  writeTextInputData(text) {
    firebase.database().ref('about/').set({ text })
  }

  render() {
    this.writeTextInputData(text)

    return (
      <View>


      </View>
    )
  }
}
