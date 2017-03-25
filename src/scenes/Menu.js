import Image from 'react-native-transformable-image';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Menu extends Component {
  render() {
    return (
      <View>
          <Image
          style={{height:515}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          enableTranslate = {false}
          //pixels={{width: 3607, height: 2400}}
        />

      </View>
    )
  }
}
