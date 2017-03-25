//import Image from 'react-native-transformable-image';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

export default class Menu extends Component {
  render() {
    return (
      <View>
        <ImageZoom 
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height-100}
          imageWidth={Dimensions.get('window').width}
          imageHeight={583}
          longPressTime={100}>
          <Image 
            style={{width:Dimensions.get('window').width, height:550}}
            source={{uri:'http://freshcoast.se/wp-content/uploads/2016/06/meny_2016.jpg'}}/>
        </ImageZoom>        
      </View>
    )
  }
}

