import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
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

    this.state = {id:'', openModal: false};

    this.sendPosition = this.sendPosition.bind(this);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds(device) {
    this.setState ({
      oneSignalDevice : device
    })
    console.log('Device info: ', this.state.oneSignalDevice);
  }


  sendPosition() {
    // to be implemented
    var id;
    var time = new Date().getTime();

    if (this.state.id === '') {
      id = generate(32);
      this.setState({id: id});
    } else {
      id = this.state.id;
    }

    
    location.getUserLocation().then((position) => {
        location.uploadUserLocation(id, this.state.oneSignalDevice.userId, 
            position.coords.latitude, position.coords.longitude, time);
    }).catch((error) => {
        alert(JSON.stringify('ERROR: ' + error));
    });
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
        handlerDefaultView={
          <View style={{flex:1, justifyContent:'center', }}>
            <Image source={require('../../assets/layout/vag.png')} style={styles.wave} resizeMode="stretch" />
            <View style={{flex: 1, backgroundColor: 'white'}}>
              <Image source={require('../../assets/layout/arrow.png')} style={{width: 15, height: 8.5, position: 'relative', alignSelf:'center',backgroundColor:"#FFFFFF"}}/>
            </View>
          </View>
        }>
          <View style={styles.slideBackground}>
          </View>
          <Button containerStyle={styles.buttonContainer}
                    onPress={this.sendPosition}>
                    <Text style={styles.buttonText}>Gör mig synlig för båtarna</Text>
          </Button>
          <Button containerStyle={styles.questionmark}
                    style={styles.questionmarkButton}
                    onPress={() => this.props.onInfoModalChange(true)}>
                    ?
          </Button>
        </SlideDownView>
 
    );
  }
}
