import React, { Component } from 'react';
import * as firebase from 'firebase';
import AdminHeader from '../components/admin/AdminHeader';
import BackGeo from '../components/BackGeo';
import BoatElements from '../components/BoatElements';
import AdminLogin from '../components/AdminLogin';
import UpdateAboutUsModal from '../components/admin/UpdateAboutUsModal';
import DeleteAllMarkersModal from '../components/admin/DeleteAllMarkersModal';
import MySettingsModal from '../components/admin/MySettingsModal';


import * as location from '../utils/location';
import resolveAssetSource from 'resolveAssetSource';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Modal,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import styles from '../style/admin';

let headUrl = require('../../assets/admin/head/adminhead.png');

export default class Admin extends Component {
	componentWillMount() {
    this.isMount = true;
    this.getAdmin = this.getAdmin.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.loadProfileImage = this.loadProfileImage.bind(this);
    this.onUpdateAboutUsModalChange = this.onUpdateAboutUsModalChange.bind(this);
    this.onDeleteAllUsersModalChange = this.onDeleteAllUsersModalChange.bind(this);
    this.onMySettingsModalChange = this.onMySettingsModalChange.bind(this);
    this.uploadAbout = this.uploadAbout.bind(this);
    this.aboutTextUpdate = this.aboutTextUpdate.bind(this);
    this.nameUpdate = this.nameUpdate.bind(this);
    this.phoneUpdate = this.phoneUpdate.bind(this);
    this.regionUpdate = this.regionUpdate.bind(this);
    this.fromToUpdate  = this.fromToUpdate.bind(this);
    this.deleteUsers = this.deleteUsers.bind(this);
    this.uploadUserInfo = this.uploadUserInfo.bind(this);
    this.state = {
      mySettingsModalOpen: false,
      deleteUsersModalOpen: false,
      updateModalOpen: false,
    	headerHeight: this.calcImageHeight(headUrl)-10,
      showTextInput: false,
      inputText: '',
      showAddboat: false,
      isLoggedInBool: false,
      name: '',
      imgUrl: '',
      imgUrlFetched: false,
      userloaded: false,
      isOut: false,
      currentAdmin: '',
      fullAdmin: '',
    };
    this.loadAboutText();
  }

	componentWillUnmount(){
    this.isMount = false;
    firebase.database().ref('admins').off('value', this.getAdmin);
  }

  getAdmin(snapshot){
  	var userId = firebase.auth().currentUser.uid;
		admin = snapshot.exportVal();
  	this.setState({
  		currentAdmin: admin[userId],
  		isOut: admin[userId].isOut,
      fullAdmin: admin[userId].fullAdmin
  	});
  }

  loadUser(){
  	var userId = firebase.auth().currentUser.uid;
  	firebase.database().ref('admins/' + userId).once('value').then((snapshot)=>{
  		if(this.isMount){
  			var admin = snapshot.exportVal();
  			this.setState({
  				name: admin.name,
  			});
  			if(admin.imgURL === undefined){
  				this.setState({
  					userloaded: true,
  				});
  			}else{this.loadProfileImage(admin.imgURL);}
  		}
  	});
  }

	loadProfileImage(url){
  	var storage = firebase.storage().ref('Admin').child(url);
  	storage.getDownloadURL().then((url) => {
  		if(!url){return;}
  		this.setState({
  			imgUrl: url, 
  			userloaded: true,
  			imgUrlFetched: true,
  		});
  	}).catch((error)=>{
  		console.log('error (Admin.js): ', error);
  	});
  }

  loadAboutText() {
    firebase.database().ref('about').on('value',
    (snapshot) => {
      if(this.isMount){
        this.setState({
          aboutText: snapshot.exportVal().about,
        });
      }
    });
  }

  isLoggedIn(status) {
    this.setState({ isLoggedInBool: status });
    if(this.state.isLoggedInBool && status){
      this.loadUser();
      firebase.database().ref('admins').on('value', this.getAdmin);
    }
    else{
      this.setState({
        userloaded: false,
        imgUrlFetched: false,
        imgUrl: '',
      });
    }
  }

  getWidthDim(dim){
  	return Dimensions.get('window').width*dim;
  }

	calcImageHeight(url){
    var source = resolveAssetSource(headUrl);
    return Dimensions.get('window').width/source.width*source.height;
  }

  toggleGPS(){
  	var userId = firebase.auth().currentUser.uid;
  	firebase.database().ref('admins').once('value', (snapshot) => {
  		var snapvalue = snapshot.exportVal();
  		var isOut = snapvalue[userId].isOut;
  		if(!isOut){
  			new BackGeo().start(userId);
  			firebase.database().ref('admins/'+userId)
        .update({isOut: true})
        .then(() => {
        }, (error) => {
          console.log('error', error);
        });
  		}
  		else if(isOut){
  			new BackGeo().stop();
  			firebase.database().ref('admins/'+userId)
        .update({isOut: false})
        .then(() => {
        }, (error) => {
          console.log('error', error);
        });
  		}
  	});
  }
  onUpdateAboutUsModalChange(updateModalOpen) {
    this.setState({updateModalOpen: updateModalOpen});
  }
  aboutTextUpdate(aboutText){
    this.setState({aboutText});
  }
  nameUpdate(currentName){
    this.setState({currentAdmin:{
      name: currentName, 
      phone: this.state.currentAdmin.phone,
      region: this.state.currentAdmin.region,
      fromTo: this.state.currentAdmin.fromTo,
    }});
  }
  phoneUpdate(phoneNumber){
    this.setState({currentAdmin: {
      name: this.state.currentAdmin.name, 
      phone: phoneNumber,
      region: this.state.currentAdmin.region,
      fromTo: this.state.currentAdmin.fromTo,
    }});
  }
  regionUpdate(currentRegion){
    this.setState({currentAdmin: {
      name: this.state.currentAdmin.name, 
      phone: this.state.currentAdmin.phone,
      region: currentRegion,
      fromTo: this.state.currentAdmin.fromTo,
    }});
  }
  fromToUpdate(fromTo){
    this.setState({currentAdmin: {
      name: this.state.currentAdmin.name, 
      phone: this.state.currentAdmin.phone,
      region: this.state.currentAdmin.region,
      fromTo: fromTo,
    }});
  }
  uploadAbout() {
    firebase.database().ref('about').set({
      about: this.state.aboutText
    }).then(() => {
    }, (error) => {
      console.log('error', error);
    });
    this.onUpdateAboutUsModalChange(false);
  }
  uploadUserInfo() {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('admins/'+userId).update({
      name: this.state.currentAdmin.name,
      phone: this.state.currentAdmin.phone,
      region: this.state.currentAdmin.region,
      fromTo: this.state.currentAdmin.fromTo
    })
    .then(() => {
    }, (error) => {
      console.log('error', error);
    });
    this.onMySettingsModalChange(false);
  }

  deleteUsers(){
    location.deleteAllUserLocations();
    this.onDeleteAllUsersModalChange(false);
  }

  onDeleteAllUsersModalChange(deleteUsersModalOpen) {
    this.setState({deleteUsersModalOpen: deleteUsersModalOpen});
  }

  onMySettingsModalChange(mySettingsModalOpen) {
    this.setState({mySettingsModalOpen: mySettingsModalOpen});
  }
  render() {
		var Url = !this.state.isOut ? 
  		require('../../assets/admin/start-gps.png'):
  		require('../../assets/admin/stop-gps.png');
  	var noImageUrlImage = 
  		require('../../assets/admin/male-icon.png');
    return (
    	<View>
    		<StatusBar hidden={true} barStyle="dark-content"/>
	    	{this.state.isLoggedInBool && this.state.userloaded ?
	    		<View style={styles.topContainer}>
		    		<AdminHeader 
			    		name={this.state.name} 
			    		email={firebase.auth().currentUser.email} 
			    		headerHeight={this.state.headerHeight}
			    	/>
						<View style={styles.gpsAndProfile}>
		    			{this.state.imgUrlFetched ? 
	    					<Image source={
	    						{uri: this.state.imgUrl, 
	    						 width: this.getWidthDim(0.5)-7.5, 
	    						 height:this.getWidthDim(0.5)-7.5}}
	    						 style={{borderRadius: 10, marginLeft: 5, marginRight: 2.5}}
	    					/> :
	    					<Image source={noImageUrlImage} style={styles.profileImage}/>
		    			}
		    			<TouchableOpacity onPress={this.toggleGPS.bind(this)} >
		    				<Image source={Url} style={styles.gpsImage} />
		    			</TouchableOpacity>
		    		</View>
		    		<View style={styles.buttonsContainer}>
			    		<TouchableOpacity onPress={() => this.onMySettingsModalChange(true)}>
			    			<Image source={require('../../assets/admin/settings.png')} style={styles.editProfile} />
			    		</TouchableOpacity>
              {this.state.fullAdmin ?
  			    		<TouchableOpacity onPress={() => this.onUpdateAboutUsModalChange(true)}>
  			    			<Image source={require('../../assets/admin/edit-about.png')} style={styles.editAbout} />
  			    		</TouchableOpacity>
                :
                <Image source={require('../../assets/admin/editAboutNo.png')} style={styles.editAbout} />
              }
              {this.state.fullAdmin ?
  			    		<TouchableOpacity onPress={() => this.onDeleteAllUsersModalChange(true)}>
  			    			<Image source={require('../../assets/admin/trash-icon.png')} style={styles.trashIcon} />
  			    		</TouchableOpacity>
                :
                <Image source={require('../../assets/admin/deleteUsersNo.png')} style={styles.trashIcon} />
              }
		    		</View>
	    		</View>
	    		: 
	    		[]
	    	}
	    	<View style={{padding:25}}>
	    		<AdminLogin
	    			userloaded={this.state.userloaded}
	    			isLoggedIn={this.isLoggedIn.bind(this)}
	          isLoggedInBool={this.state.isLoggedInBool}/>
	    	</View>

        <UpdateAboutUsModal 
          openModal ={this.state.updateModalOpen}
          onUpdateAboutUsModalChange={this.onUpdateAboutUsModalChange}
          aboutText = {this.state.aboutText}
          uploadAbout = {this.uploadAbout}
          aboutTextUpdate = {this.aboutTextUpdate}/>
        <DeleteAllMarkersModal
          openModal={this.state.deleteUsersModalOpen}
          onDeleteAllUsersModalChange={this.onDeleteAllUsersModalChange}
          deleteUsers = {this.deleteUsers}/>

        <MySettingsModal 
          openModal = {this.state.mySettingsModalOpen}
          onMySettingsModalChange={this.onMySettingsModalChange}
          currentUser={this.state.currentAdmin}
          nameUpdate={this.nameUpdate}
          phoneUpdate={this.phoneUpdate}
          regionUpdate={this.regionUpdate}
          fromToUpdate={this.fromToUpdate}
          uploadUserInfo={this.uploadUserInfo}
        />
    	</View>
    );
	}
}