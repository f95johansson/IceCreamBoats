import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
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


export default class Overlay extends Component {

  constructor(props) {
    super(props);
    this.state = {id:'', openModal: false, isDown: '180deg'};
    this.sendPosition = this.sendPosition.bind(this);
    this.onSlideFinished = this.onSlideFinished.bind(this);
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

  onSlideFinished(isDown) {
    this.setState({isDown: isDown ? '0deg' : '180deg'});
    this.refs.arrow.transitionTo({transform: [{rotate: this.state.isDown}]}, 500)
  }

  render() {
    console.log('state.isDown', this.state.isDown)
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