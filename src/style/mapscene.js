import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


var styles = StyleSheet.create({
  //MapScene.js
  map: {
    flex: 1
  },
  MapScene: {
    flex: 1,
    alignSelf: 'stretch',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 200,
  },
  buttonView:{
    alignSelf: 'center',
    width: 250,
  }

});

export default styles
