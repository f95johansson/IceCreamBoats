import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import OneSignal from 'react-native-onesignal';
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  AppState
} from 'react-native';
import SlideDownView from './SlideDownView';
import {generate} from '../utils/randomstring';
import * as location from '../utils/location';
import styles from '../style/components/mapsceneoverlay';
import gstyles from '../style/styles';
import {askForNotificationPermition} from '../utils/notifications';
import {getUserId} from '../utils/userId';


import {postToArea,postNotification} from '../utils/notifications';


const visibleTimeInHours = 4;
const visibleTimeInSeconds = visibleTimeInHours*60*60;
const visibleTimeInMilliseconds = visibleTimeInSeconds*1000;


export default class Overlay extends Component {


  componentWillMount() {
    this.timer = null;
    this.state = {id: '', appstate: AppState.currentState, openModal: false,
      isDown: '180deg', isSendingPos: false};
    this.setSecondsLeftOnTimer(visibleTimeInSeconds);

    this.sendPosition = this.sendPosition.bind(this);
    this.quitSending = this.quitSending.bind(this);
    this.onSlideFinished = this.onSlideFinished.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.tickTimer = this.tickTimer.bind(this);
    clearInterval(this.timer);

    getUserId((userID) => {

      location.getUserTimeStamp(userID).then((timestamp) => {
        var userid = userID;
        var time = new Date().getTime();


        var timediff = time-timestamp;

        var timeRemaining = Math.floor(visibleTimeInSeconds - ((timediff)/1000));
        //TODO: make it easier to set the time
        if ((timediff) > (visibleTimeInMilliseconds)) {
          this.setState({id: userid, appstate: AppState.currentState,
            openModal: false, isDown: '180deg', isSendingPos: false, timeleft: visibleTimeInSeconds});

        }
        else if ((timediff) < (visibleTimeInMilliseconds)) {


          this.setState({appstate: AppState.currentState, openModal: false,
            isDown: '180deg', isSendingPos: true, timeleft: timeRemaining});

            this.startTimer();
        }
        else {
          this.setState({id: userid, appstate: AppState.currentState,
            openModal: false, isDown: '180deg', isSendingPos: false, timeleft: visibleTimeInSeconds })
        }
      }).catch((error) => {
        console.log("Error on getting userID for timer: ", error);
      });
    });

  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appstate.match(/inactive|background/) && nextAppState === 'active') {

      clearInterval(this.timer);
      this.timer = null;

      getUserId((userID) =>  {
        location.getUserTimeStamp(userID).then((timestamp) => {
          var time = new Date().getTime();
          var timeDiff = (time - timestamp);
          var timeRemaining = Math.floor(visibleTimeInSeconds - ((timeDiff)/1000));
          //TODO: make it easier to set the time
          if ((timeDiff) > (visibleTimeInMilliseconds)) {
            location.deleteUserLocation(userID);
            this.setState({isSendingPos: false, timeleft: visibleTimeInSeconds});

          }
          else if ((timeDiff) < (visibleTimeInMilliseconds)) {
            this.setState({isSendingPos: true, timeleft: timeRemaining });
            this.startTimer();
          }
          else {
            this.setState({isSendingPos: false, timeleft: visibleTimeInSeconds });
          }
        }).catch((error) => {
          alert(JSON.stringify(error));
        });
      });



    }
    this.setState({appstate: nextAppState});
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
    clearInterval(this.timer)
  }

  sendPosition() {
    var time = new Date().getTime();
    this.setState({isSendingPos: true});
    askForNotificationPermition();
    getUserId(function(userID) {
      location.getUserLocation().then((position) => {
        location.uploadUserLocation(userID, position.coords.latitude, position.coords.longitude, time);
      }).catch((error) => {

        console.log('Error: ', error);
      });
    });
    this.startTimer();
    // change look of button to white
    //this.setState({buttonpressState: !this.state.buttonpressState});



  }

  /* stop sending position - set sendingstate to false which shows button again*/
  quitSending() {
      getUserId((userID) => {
        location.deleteUserLocation(userID);
      });
      this.setState({isSendingPos: false, timeleft: visibleTimeInSeconds});
      clearInterval(this.timer);
      this.timer = null;
  }

  onSlideFinished(isDown) {
    this.setState({isDown: isDown ? '0deg' : '180deg'});
    this.refs.arrow.transitionTo({transform: [{rotate: this.state.isDown}]}, 500)
  }

  startTimer() {
    if (this.timer === null) {
      this.timer = setInterval(this.tickTimer, 1000);
    }
  }

  tickTimer() {
    let timeLeft = this.state.timeleft - 1;
    this.setSecondsLeftOnTimer(timeLeft);

    if (timeLeft == 0) {
      clearInterval(this.timer);
      this.quitSending();
    }

  }

  setSecondsLeftOnTimer(seconds) {
    this.setState({timeleft: seconds});
  }

  formatSeconds(seconds) {
    console.log(seconds)

    let hourdivisor = 60*60;

    let hoursleft = Math.floor(seconds / (hourdivisor));
    let minutesleft = Math.floor((seconds / 60)-(hoursleft*60));
    let secondsleft = Math.floor(seconds - (minutesleft*60)- (hoursleft*hourdivisor));

    return stringPad(hoursleft, 2, '0')+':'+stringPad(minutesleft, 2, '0')+':'+stringPad(secondsleft, 2, '0');
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
        {
          this.state.isSendingPos ?

          <Button disabled={true} containerStyle={styles.visibleButton}>
                    <Text style={styles.activebuttonText}>Synlig</Text>
          </Button>
            :
            <Button disabled={true} containerStyle={styles.visibleButton}>
                      <Text style={styles.blackbuttonText}>Ej synlig</Text>
            </Button>
        }
          <View style={styles.slideBackground}>
          </View>


          { this.state.isSendingPos ?

            <View style={styles.isSendingcontainer}>
              <Text style={styles.sendingPosTimer}>{this.formatSeconds(this.state.timeleft)} </Text>
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


function stringPad(number, width, paddingChar) {
  number = number + '';
  number = number || '0';
  paddingChar = paddingChar + '';
  return number.length >= width ? number : new Array(width - number.length + 1).join(paddingChar) + number;
}
