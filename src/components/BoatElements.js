import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';

export default class BoatElements extends Component {

  writeBoatData(boatname, phone, region, isOut, x, y) {

    firebase.database().ref('boats/' + boatname).set({
      boatname,
			phone,
			region,
			isOut,
      x,
      y,
    })
  }

  render() {
    this.writeBoatData('Båt1', '0735775343', 'Västerbotten', true, '1232', '2232')

    return (
      <View style={styles.rowElements}>
        <Text>Båt 1 </Text>
        <Text>Karta(bild) </Text>
        <Text>Penna(bild) </Text>
        <Text>Checkbox(bild) </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowElements: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        paddingTop: 10,
    },

});
