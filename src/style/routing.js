import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create ({
  app: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',  },

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
    marginBottom: 60,
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
  iconTextSelected: {
    alignSelf: 'center',
    marginTop: 3,
    fontSize: 12,
    color: '#dc2b0b',
  },
});

export default styles
