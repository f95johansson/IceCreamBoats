import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create ({
  app: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  Routing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
  },
  NavButton: {
    padding: 20,
    flex: 1,
  },
  Scene: {
    flex: 1,
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

  }
});

export default styles
