import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create ({
  app: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  NormalBackground: {
    backgroundColor: '#FFFFFF',  
  },
  MenuBackground: {
    backgroundColor: '#8ed2de',
  },
  Routing: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  NavButton: {
    padding: 14,
    flex: 1,
  },
  Scene: {
    flex:1,
    alignSelf: 'stretch',
    paddingBottom: 60,
  },
  icon: {
    alignSelf: 'center',
    width: 23,
    height: 23,
  },
  iconText: {
    alignSelf: 'center',
    marginTop: 3,
    fontSize: 12
  },
  iconTextWhite: {
    alignSelf: 'center',
    marginTop: 3,
    fontSize: 12,
    color: '#FFFFFF'
  },
  iconTextSelected: {
    alignSelf: 'center',
    marginTop: 3,
    fontSize: 12,
    color: '#dc2b0b',
  },
});

export default styles
