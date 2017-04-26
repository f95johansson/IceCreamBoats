import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


var styles = StyleSheet.create({
  modalStyle:{
   	alignItems: 'center',
    borderRadius: 6,
    elevation: 5,
    margin: 30,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#FFFFFF'
  },
  modalHeader:{
  	fontSize: 22, 
  	marginBottom: 10, 
  	marginTop: 10, 
  	color: '#EA591C'
  },
  modalText:{
  	fontSize: 18, 
  	marginBottom: 18
  },
  modalExit:{
  	position:'absolute', 
  	right: 0, 
  	marginTop: 10
  }
});

export default styles