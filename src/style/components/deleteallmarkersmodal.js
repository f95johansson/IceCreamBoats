import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  modalStyle:{
  	borderWidth: 3,
  	borderColor: '#FFF',
   	alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    top: 100,
    margin: 30,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#07599D',
    shadowColor: '#888',
    shadowOffset:{width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  modalHeader:{
  	alignSelf: 'center',
  	fontSize: 22, 
  	marginBottom: 10, 
  	marginTop: 10, 
  	color: '#FFF',
    fontWeight: 'bold',
  },
  modalText:{
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  
  modalExit:{
  	position:'absolute', 
  	right: 0, 
  	marginTop: 10,
  },
  cross:{
    fontSize: 22
  },

  buttonsContainer: {
    flexWrap:'wrap', 
    flexDirection: 'row', 
    alignSelf: 'center'
	},
	button: {
		justifyContent: 'center', 
		width: 90, 
		margin: 10,
		height:40, 
		borderRadius: 20,
		borderWidth: 2,
		borderColor: '#FFF' ,
		backgroundColor: '#07599D',
	},
});

export default styles