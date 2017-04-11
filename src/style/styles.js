import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


var styles = StyleSheet.create({

  //About.js
  baseText: {
    fontFamily: 'Cochin',
    textAlign: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  //MapScene.js
  map: {
    flex: 1
  },
  MapScene: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 200,
  },

});

export default styles
