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
    this.timer = 0;
    this.state = {id:'', openModal: false, isDown: '180deg', isSendingPos: false,
    hours: 3, minutes: 59, seconds: 59 , timeleft: 14399};
    this.sendPosition = this.sendPosition.bind(this);
    this.quitSending = this.quitSending.bind(this);
    this.onSlideFinished = this.onSlideFinished.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.tickTimer = this.tickTimer.bind(this);

  }
  componentWillMount() {

    if (this.state.id != 0){
      var time = location.getUserTimeStamp(this.state.id);

    }


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
        location.uploadUserLocation(id, position.coords.latitude, position.coords.longitude, time);
    }).catch((error) => {
        alert(JSON.stringify(error));
    });

    this.startTimer();

    // change look of button to white
    //this.setState({buttonpressState: !this.state.buttonpressState});



  }

  /* stop sending position - set sendingstate to false which shows button again*/
  quitSending() {

    var time = location.getUserTimeStamp(this.state.id);

    console.log(this.state.id);
    console.log(time);

    location.deleteUserLocation(this.state.id);
    // location.stopSendingUserLocation(id)
    this.setState({isSendingPos: false, hours: 3, minutes: 59, seconds: 59,
      timeleft: 14399});
    clearInterval(this.timer);
    this.timer = 0;
  }

  onSlideFinished(isDown) {
    this.setState({isDown: isDown ? '0deg' : '180deg'});
    this.refs.arrow.transitionTo({transform: [{rotate: this.state.isDown}]}, 500)
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.tickTimer, 1000);
    }
  }

  tickTimer() {
    let timeLeft = this.state.timeleft - 1;

    let hourdivisor = 60*60;
    let hoursleft = Math.floor(timeLeft / (hourdivisor));

    let minutesleft = Math.floor((timeLeft / 60)-(hoursleft*60));
    let secondsleft = Math.floor(timeLeft - (minutesleft*60)- (hoursleft*hourdivisor));

    this.setState({hours: hoursleft, minutes: minutesleft, seconds: secondsleft,
    timeleft: timeLeft });

    if (timeLeft == 0) {
      clearInterval(this.timer);
    }

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


          { this.state.isSendingPos ?

            <View style={styles.isSendingcontainer}>
              <Text style={styles.sendingPosTimer}>{this.state.hours}:{
                  this.state.minutes}:{this.state.seconds}</Text>
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
