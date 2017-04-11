import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
    container: {
      borderTopColor: '#EA591C',
      borderTopWidth: 6,
      position: 'absolute',
      overflow: 'hidden',
      bottom: 0,
      opacity: this.state.containerOpacity,
      backgroundColor : this.state.containerBackgroundColor,
      height: this.state.containerHeight
    },
    handler: {
      height : this.state.handlerHeight,
      width : width,
      justifyContent : 'center',
      opacity : this.state.handlerOpacity,
      backgroundColor : this.state.handlerBackgroundColor
    }

});

export default styles
