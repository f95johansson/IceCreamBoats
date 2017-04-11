import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create ({
  app: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#F5BB94',
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
    width: 27,
    height: 27,
  },
  iconText: {
    alignSelf: 'center'

  }
});

export default styles
