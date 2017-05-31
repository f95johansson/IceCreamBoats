import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


var styles = StyleSheet.create({
  //About.js
  titleText: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EA591C',
    textAlign: 'center',
  },
  titleTextNotBold: {
    marginTop: 10,
    fontSize: 25,
    color: '#EA591C',
    textAlign: 'center',
  },
  miniTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 50,
  },

  baseText: {
    textAlign: 'center',
    paddingLeft: 32,
    paddingRight: 32,
    fontSize: 16,
    paddingBottom: 15,
  },

  headerImage: {
    width: 400,
    height: 250,
  },
  boatView: {
    flex:1,
    flexWrap:'wrap',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  logoView:{
    flex:1,
    flexWrap:'wrap',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  logoImage:{
    margin: 10,
  },
  adminLogin:{
    marginTop: 50,
    fontSize: 12,
    alignSelf: 'center',
  },
  privacyPolicy:{
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 12,
  },
});

export default styles
