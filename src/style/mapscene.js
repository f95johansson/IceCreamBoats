import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  map: {
    flex: 1
  },
  MapScene: {
    flex: 1,
    alignSelf: 'stretch',
  },
  boatImage: {
  	height: 50,
  	width: 25,
  },
  userPosition: {
    height: 18,
    width: 18,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#888',
    shadowOffset:{width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  userPositionInside: {
    height: 11,
    width: 11,
    backgroundColor: 'rgba(2, 136, 209, 1)',
    borderRadius: 50,
    alignSelf: 'center'
  },
  meImage: {
    height: 20,
    width: 20,
  }
});

export default styles;
