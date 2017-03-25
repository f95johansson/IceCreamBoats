import Image from 'react-native-transformable-image';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class IceCreamBoats extends Component {
  render() {
    return (
      <View>
          <Image
          style={{height:515}}
          source={{uri: 'http://freshcoast.se/wp-content/uploads/2016/06/meny_2016.jpg'}}
          enableTranslate = {false}
          //pixels={{width: 3607, height: 2400}}
        />
       
      </View>
    )
  }
}
