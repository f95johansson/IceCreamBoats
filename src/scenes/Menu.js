//import Image from 'react-native-transformable-image';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import styles from '../style/menu'

export default class Menu extends Component {
  render() {
    return (
      <View
        style={styles.background}>
        <StatusBar
          backgroundColor={'#8ed2de'}
          barStyle="light-content"
        />
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height-100}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height-100}
          longPressTime={100}>
          <Image
            style={{width:Dimensions.get('window').width, height:Dimensions.get('window').width * 1.25}}
            source={{uri:'http://freshcoast.se/wp-content/uploads/2016/06/meny_2016.jpg'}}/>
        </ImageZoom>
      </View>
    )
  }
}
