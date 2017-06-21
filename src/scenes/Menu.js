//import Image from 'react-native-transformable-image';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import resolveAssetSource from 'resolveAssetSource';
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

let menuImage = require('../../assets/menu/utbud.png');

export default class Menu extends Component {

  calcImageHeight(){
    var source = resolveAssetSource(menuImage);
    return Dimensions.get('window').width/source.width*source.height;
  }

  render() {
    return (
      <View
        style={styles.background}>
        <StatusBar
          backgroundColor={'#8ADBE6'}
          barStyle="light-content"
        />
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height-100}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height-100}
          longPressTime={100}>
            <Image source={menuImage} style={{flex: 1, width: null, height: this.calcImageHeight()}} resizeMode="stretch"/>
            
        </ImageZoom>
      </View>
    )
  }
}




/*
*THIS IS FOR DATABASE STORAGE, NONE EFFICIENT AT THE MOMENT.
*   
*   componentWillMount() {
*     this.isMount = true;
*     this.state = {
*      imgUrl: '../../assets/menu/utbud.png'
*     };
*     this.loadImage()
*   }
*   
*   componentWillUnmount(){
*     this.isMount = false;
*   }

*   loadImage() {
*    var storage = firebase.storage()
*    var storageRef = storage.ref()
*    var imagesRef = storageRef.child('Utbud/utbud.png')
*    imagesRef.getDownloadURL().then((url) => {
*      if (!url) { return }
*      if(this.isMount){
*        this.setState({ imgUrl: url })
*      }
*
*    }).catch(function(error) {
*      console.log('errrr (Menu.js)', error);
*    })
*  }
*
*   --*render*--
*  {this.state.imgUrl ?
*            <Image
*            style={{width:Dimensions.get('window').width, height:Dimensions.get('window').width * 1.5}}
*            source={{uri: this.state.imgUrl }}/>:[]}
*/
