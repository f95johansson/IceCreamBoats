import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
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


export default class Overlay extends Component {

  constructor(props) {
    super(props);

    this.state = {id:'', openModal: false};

    this.sendPosition = this.sendPosition.bind(this);
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
        location.uploadUserLocation(id, position.coords.latitude, position.coords.longitude, time);
    }).catch((error) => {
        alert(JSON.stringify(error));
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