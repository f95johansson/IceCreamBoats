import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import styles from '../../style/admin';

let headUrl = require('../../../assets/admin/head/adminhead.png');

export default class AdminHeader extends Component{
	componentWillMount(){
		this.state = {
			name: this.props.name,
			email: this.props.email,
			headerHeight: this.props.headerHeight
		};
	}
	render(){
		return(
			<View style={[styles.headerContainer,{height: this.props.headerHeight}]}>
  			<Image source={headUrl} style={styles.headerImage} resizeMode="stretch" />
  			<View style={[styles.headerTextContainer ,{height: this.props.headerHeight}]}>
  				<Text style={styles.headerName}>{this.props.name}</Text>
  				<Text style={styles.headerEmail}>{this.props.email}</Text>
  			</View>
  		</View>
		);
	}

}