import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  //MapSceneOverlay
  overlay:{
  	flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    right: 0,
    left: 0,
    height: 200,
  },

  wave: {
  	flex: 1,
  	width: null,
  },

  arrow:{
    width: 15,
    height: 8.5,
    position: 'relative',
    alignSelf:'center',
    backgroundColor:"#FFFFFF",
  },

  slideBackground: {
  	height: 120,
    top: 58,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },

  buttonContainer: {
  	justifyContent: 'center',
    padding: 7,
    height:35,
    alignSelf: 'center',
    width: 210,
    borderRadius:50,
    backgroundColor: '#EA591C',
    shadowColor: '#888',
    shadowOffset:{width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    top: 20,
  },

  visibleButton: {
    position: 'absolute',
  	justifyContent: 'center',
    padding: 7,
    height:35,
    width: 100,
    borderRadius:50,
    backgroundColor: '#FFF',
    elevation: 2,
    top: 0,
  },

  isSendingcontainer: {
    height:80,
    alignSelf: 'center',
    width: 210,
    overflow:'visible',
    backgroundColor: '#fff',
    top: 20,
    flexDirection: 'column',
    //justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingVertical: 0
  },

  sendingPosTimer: {
    height: 40,
    width: 110,
    alignSelf: 'center',
    color: '#EA591C',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sendingQuitText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#777777',
    fontSize: 16,
    top: -5,
    fontWeight: '600',
    textDecorationLine: 'underline'
  },

  buttonText: {
  	color: '#FFFFFF',
    alignSelf:'center',
    fontSize: 16
  },

  blackbuttonText: {
  	color: '#bbbbbb',
    alignSelf:'center',
    fontSize: 16,
    fontWeight: '400'
  },

  activebuttonText: {

  	color: '#EA591C',
    alignSelf:'center',
    fontSize: 16,
    fontWeight: 'bold'
  },

  questionmark: {
  	borderRadius:50,
    height:30,
    width: 30,
    elevation: 5,
    backgroundColor: '#FEFEFE',
    padding: 2,
    right: 25,
    top: 82.5,
    position: 'absolute',
    shadowColor: '#888',
    shadowOffset:{width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
  },

  questionmarkButton: {
  	fontSize: 19,
    color: '#777777',
    backgroundColor: 'transparent'
  },
});

export default styles
