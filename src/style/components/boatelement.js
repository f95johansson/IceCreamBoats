import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  rowElements: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 35
  },
  iconsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nameColor:{
    flex: 1,
    flexDirection: 'row',
    color: 'red'
  },
  icons: {
    paddingRight: 10
  },
  icon: {
    alignSelf: 'center',
    width: 23,
    height: 23,
    paddingRight: 20
  },
});

export default styles
