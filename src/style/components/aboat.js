import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    shadowColor: '#888',
    shadowOffset:{width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    margin: 13,
    elevation: 5,
    marginBottom:20,
  },

  info: {
    flexWrap:'wrap', 
    flexDirection:'row', 
    marginBottom: 8,
  },

  boatNr: {
    fontWeight: 'bold', 
    fontSize: 15, 
    marginRight: 10,
  },

  isOut: {
    fontWeight: 'bold', 
    fontSize: 15, 
    color:'#EA591C',
  },

  notOut: {
    color: 'grey', 
    alignSelf:'center', 
    fontSize: 16, 
    fontWeight: '400',
  },

  text: {
    fontStyle: 'italic',
  },

  boatName: {
    fontStyle: 'italic', 
    fontWeight:'bold', 
    paddingTop: 11, 
    paddingBottom: 5
  },

  phone: {
    flexWrap:'wrap', 
    flexDirection: 'row'
  },

  phoneImage: {
    height: 25, 
    width: 25,
  },

  call: {
    paddingLeft: 10, 
    top: 2
  }


  
});

export default styles
