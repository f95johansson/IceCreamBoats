import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  //MapSceneOverlay
  overlay:{
  	flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 200,
  },

  wave: {
  	flex: 1,
  	width: null,
  },

  slideBackground: {
  	height: 120, 
    top: 58, 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: '#FFFFFF', 
    position: 'absolute'
  },

  buttonContainer: {
  	justifyContent: 'center',
    padding: 7, 
    height:35, 
    alignSelf: 'center',
    width: 220, 
    overflow:'hidden', 
    borderRadius:50, 
    backgroundColor: '#EA591C', 
    shadowColor: '#888', 
    shadowOffset:{width: 5, height: 5}, 
    shadowOpacity: 1, 
    shadowRadius: 5,
    elevation: 2,
    top: 15,
  },

  buttonText: {
  	color: '#FFFFFF', 
    alignSelf:'center', 
    fontSize: 16
  },

  questionmark: {
  	borderRadius:50,
    height:30, 
    width: 30,
    elevation: 5,
    overflow:'hidden',
    backgroundColor: '#FEFEFE',
    padding: 2, 
    right: 25,
    top: 77.5,
    position: 'absolute',
  },

  questionmarkButton: {
  	fontSize: 19, 
    color: '#777777',
  },
});

export default styles