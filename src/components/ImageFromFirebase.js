import React, { Component } from 'react';
import {
  Image,
} from 'react-native';
import { connect } from 'react-firebase-storage-connector';

let connector = connect(props => ({source: props.storageRef}));

let ImageFromFirebase = 
	connector((innerprops: { as?: any, source: string, storageRef: Object, alt?: string }) => {
  		const { alt, ...imgProps } = innerprops;
  		delete imgProps.storageRef;
  		return <Image {...imgProps} />;
});



const Container = (props) => {
	console.log('Image: ', JSON.stringify(Object.keys(props)));
	return <Image source={props.storageRef} style={{width: 100, height: 100}}/>
};

const imageMapper = (props) => (
	{imageUrl: props.source}
);
export default connect(imageMapper)(Container);