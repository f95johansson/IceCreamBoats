import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import OneSignal from 'react-native-onesignal';
import * as Animatable from 'react-native-animatable'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing
} from 'react-native';
import SlideDownView from './SlideDownView';
import {generate} from '../utils/randomstring';
import * as location from '../utils/location';
import styles from '../style/components/mapsceneoverlay'
import gstyles from '../style/styles'

import {postToArea,postNotification} from '../utils/notifications';

export default class Overlay extends Component {

  componentWillMount() {
    OneSignal.addEventListener('ids', this.onIds.bind(this));

    this.state = {id:'', openModal: false, isDown: '180deg', isSendingPos: false};
    this.sendPosition = this.sendPosition.bind(this);
    this.quitSending = this.quitSending.bind(this);
    this.onSlideFinished = this.onSlideFinished.bind(this);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds(device) {
    this.setState ({
      oneSignalDevice : device
    })
    console.log('Onsignal device info: ', this.state.oneSignalDevice);
  }


  sendPosition() {
    // to be implemented
    var id;
    var time = new Date().getTime();

    if (this.state.id === '') {
      id = generate(32);
      this.setState({id: id, isSendingPos: true});
    } else {
      id = this.state.id;
      this.setState({isSendingPos: true});
    }

    
    location.getUserLocation().then((position) => {
        location.uploadUserLocation(id, this.state.oneSignalDevice.userId, 
            position.coords.latitude, position.coords.longitude, time);
    }).catch((error) => {
        alert(JSON.stringify('ERROR: ' + error));
    });

    // change look of button to white
    //this.setState({buttonpressState: !this.state.buttonpressState});



  }

  /* stop sending position - set sendingstate to false which shows button again*/
  quitSending() {

    location.deleteUserLocation(this.state.id);
    // location.stopSendingUserLocation(id)
    this.setState({isSendingPos: false});
  }

  onSlideFinished(isDown) {
    this.setState({isDown: isDown ? '0deg' : '180deg'});
    this.refs.arrow.transitionTo({transform: [{rotate: this.state.isDown}]}, 500)
  }

  render() {
    return (

      <SlideDownView style={styles.overlay}
        handlerOpacity={1}
        containerBackgroundColor={'#FFFFFF'}
        containerMinimumHeight={60}
        containerMaximumHeight={150}
        handlerHeight={60}
        initialHeight={150}
        onSlideFinished={this.onSlideFinished}
        handlerDefaultView={
          <View style={{flex:1, justifyContent:'center',}}>
            <Image source={require('../../assets/layout/vag.png')} style={styles.wave} resizeMode="stretch" />
            <View style={{flex: 1, backgroundColor: 'white', padding: 9}}>
              <Animatable.Image ref="arrow" source={require('../../assets/layout/arrow.png')} style={styles.arrow}/>
            </View>
          </View>
        }>
          <View style={styles.slideBackground}>
          </View>


          { this.state.isSendingPos ?

            <View style={styles.isSendingcontainer}>
              <Text style={styles.sendingPosTimer}>03:59:59</Text>
              <Text onPress={this.quitSending} style={styles.sendingQuitText}>Avbryt</Text>
            </View>
            :
            <Button containerStyle={styles.buttonContainer}
                      onPress={this.sendPosition}>
                      <Text style={styles.buttonText}>Gör mig synlig för båtarna</Text>
            </Button>
          }
          <Button containerStyle={styles.questionmark}
                    style={styles.questionmarkButton}
                    onPress={() => this.props.onInfoModalChange(true)}>
                    ?
          </Button>
        </SlideDownView>
    );
  }
}
