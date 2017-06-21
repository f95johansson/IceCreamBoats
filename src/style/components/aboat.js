import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 5,
    shadowColor: '#888',
    shadowOffset:{width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    margin: 6,
    elevation: 5,
    marginTop: 10,
    marginBottom:10,
    width: 145,
    maxWidth: 170,
  },

  boldtext: {
    fontWeight: 'bold',
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
    paddingBottom: 5,
    fontSize: 11,
  },

  boatName: {
    fontStyle: 'italic', 
    fontWeight:'bold', 
    paddingTop: 11, 
    paddingBottom: 5,
    alignSelf: 'center'
  },

  phone: {
    marginTop: 5,
    flexWrap:'wrap', 
    flexDirection: 'row',

  },

  phoneImage: {
    height: 25, 
    width: 25,
  },

  call: {
    paddingLeft: 10, 
    top: 2,
  }


  
});

export default styles
