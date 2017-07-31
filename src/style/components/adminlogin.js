import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var winWidth = Dimensions.get('window').width;
var styles = StyleSheet.create({
  textInput:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 3,
    marginBottom: 5
  },
  logout: {
  	width: (winWidth/5.5),
  	height: (winWidth/3)/3.7,
  },
  logoutview: {
    left: winWidth/1.4,
    top: -winWidth/0.978,
  }

});

export default styles;
