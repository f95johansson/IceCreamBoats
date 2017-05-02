import React, { Component } from 'react';
import {
  Image,
} from 'react-native';
import { connect } from 'react-firebase-storage-connector';

export default ImageFromFirebase = connect(props => ({
  src: props.storageRef,
}))((innerprops: { as?: any, source: string, storageRef: Object, alt?: string }) => {
  const { alt, ...imgProps } = innerprops;
  delete imgProps.storageRef;
  return <Image {...imgProps} />;
});