import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import resolveAssetSource from 'resolveAssetSource';


var headUrl = require('../../assets/admin/head/adminhead.png');
var ras= resolveAssetSource(headUrl);
var winWidth = Dimensions.get('window').width;
var headerHeight = winWidth/ras.width*ras.height;


var styles = StyleSheet.create({
	headerConatiner:{
		position: 'relative',
		width: winWidth,
	},
	headerImage:{
		flex: 1, 
		width: null, 
		height:null
	},
	headerTextContainer:{
		position: 'absolute', 
		justifyContent: 'center', 
		width: winWidth,
		borderBottomColor: '#aaa',
    	borderBottomWidth: 1,
	},
	headerName:{
		position: 'relative', 
		alignSelf:'center', 
		backgroundColor: 'transparent', 
		color: '#FFF', 
		fontWeight: '400', 
		fontSize: 20,
	},
	headerEmail:{
		position: 'relative', 
		alignSelf:'center', 
		backgroundColor: 'transparent', 
		color: '#FFF',
		fontSize: 10,
	},
	gpsAndProfile:{
		flexWrap:'wrap', 
		flexDirection: 'row', 
		marginTop: 5, 
	},
	profileImage:{
		borderRadius: 5,
		width: (winWidth/2)-7.5,
		height: (winWidth/2)-7.5,
		marginLeft: 5, 
		marginRight: 2.5, 
	},
	gpsImage:{
		borderRadius: 5,
		width: (winWidth/2)-7.5, 
		height:(winWidth/2)-7.5,
		marginRight: 5,
		marginLeft: 2.5,

	},
	buttonsContainer:{
		width: winWidth,
		flexWrap:'wrap', 
		flexDirection: 'row',
		margin: 2.5,
	},
	editProfile: {
		borderRadius: 5,
		width: (winWidth/3)-(10/3)*2,
		height: (winWidth/3)-(10/3)*2,
		margin: 2.5,

	},
	editAbout: {
		borderRadius: 5,
		width: (winWidth/3)-(10/3)*2,
		height: (winWidth/3)-(10/3)*2,
		margin: 2.5,
	},
	trashIcon: {
		borderRadius: 5,
		width: (winWidth/3)-(10/3)*2,
		height: (winWidth/3)-(10/3)*2,
		margin: 2.5,
	},
	addAdmin: {
		borderRadius: 5,
		width: (winWidth/3)-(10/3)*2,
		height: (winWidth/3)-(10/3)*2,
		margin: 2.5,
	},
	editAdmin: {
		borderRadius: 5,
		width: (winWidth/3)-(10/3)*2,
		height: (winWidth/3)-(10/3)*2,
		margin: 2.5,

	},
	trashAdmin: {
		borderRadius: 5,
		width: (winWidth/3)-(10/3)*2,
		height: (winWidth/3)-(10/3)*2,
		margin: 2.5,

	},

});

export default styles;