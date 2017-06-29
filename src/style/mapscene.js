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
  	height: 40,
  	width: 45,
  },
  userPosition: {
    height: 20,
    width: 20,
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
    height: 13,
    width: 13,
    backgroundColor: 'rgba(2, 136, 209, 1)',
    borderRadius: 50,
    alignSelf: 'center'
  }
});

export default styles;
