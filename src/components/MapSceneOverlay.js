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
import {getUserId} from '../utils/userId';


import {postToArea,postNotification} from '../utils/notifications';

export default class Overlay extends Component {

  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = {id: '', appstate: AppState.currentState, openModal: false,
      isDown: '180deg', hours: 3, minutes: 59, seconds: 59,
       timeleft: 14399, isSendingPos: false};

    this.sendPosition = this.sendPosition.bind(this);
    this.quitSending = this.quitSending.bind(this);
    this.onSlideFinished = this.onSlideFinished.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.tickTimer = this.tickTimer.bind(this);

  }
  componentWillMount() {

    OneSignal.addEventListener('ids', this.onIds.bind(this));

    clearInterval(this.timer);
    this.timer = 0;

    //console.log("helloooooooooooooo");
    getUserId((userID) => {
      //console.log("inside getuserid");

      location.getUserTimeStamp(userID).then((timestamp) => {
        var userid = userID;
        //console.log("inside timestamp" + userid);
        var time = new Date().getTime();
        //console.log(timestamp);


        var timediff = time-timestamp;

        var timeRemaining = Math.floor(14399 - ((timediff)/1000));
        console.log(timeRemaining);
        //TODO: make it easier to set the time
        if ((timediff) > (14399000)) {
          this.setState({id: userid, appstate: AppState.currentState,
            openModal: false, isDown: '180deg', isSendingPos: false, hours: 3,
             minutes: 59, seconds: 59,
             timeleft: 14399});
             console.log("if statement in usertimestampfunc");
            //this.startTimer();
        }
        else if ((timediff) < (14399000)) {

          console.log("if else 1 statement in usertimestampfunc");

          this.setState({appstate: AppState.currentState, openModal: false,
            isDown: '180deg', isSendingPos: true, timeleft: timeRemaining});

            console.log("will mount");
            this.startTimer();
        }
        else {
          console.log("else statement in usertimestampfunc");
          this.setState({id: userid, appstate: AppState.currentState,
            openModal: false, isDown: '180deg', isSendingPos: false, hours: 3,
             minutes: 59, seconds: 59, timeleft: 14399 })
        }
      }).catch((error) => {
        alert(JSON.stringify(error));
      });
    });

  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    /*
    console.log("did mount");
    this.setState({isSendingPos: true});
    */
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appstate.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      console.log(this.state.isSendingPos);

      clearInterval(this.timer);
      this.timer = 0;
      getUserId((userID) =>  {
        location.getUserTimeStamp(userID).then((timestamp) => {
          var time = new Date().getTime();

          var timeDiff = (time - timestamp);
          var timeRemaining = Math.floor(14399 - ((timeDiff)/1000));
          console.log("before timediff"+ timeDiff);
          //TODO: make it easier to set the time
          if ((timeDiff) > (14399000)) {
            console.log("foreground if");
            location.deleteUserLocation(userID);

            this.setState({isSendingPos: false, timeleft: 14399});

          }
          else if ((timeDiff) < (14399000)) {
            console.log("foreground else if");
            this.setState({isSendingPos: true, timeleft: timeRemaining });
            this.startTimer();
          }
          else {

            console.log("foreground else");
            this.setState({isSendingPos: false, hours: 3,
             minutes: 59, seconds: 59,
             timeleft: 14399 });
          }
        }).catch((error) => {
          console.log("errrrorrrr");
          alert(JSON.stringify(error));
        });
      });



    }
    this.setState({appstate: nextAppState});
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
    var time = new Date().getTime();
    this.setState({isSendingPos: true});

    getUserId(function(userID) {
      location.getUserLocation().then((position) => {
        location.uploadUserLocation(userID, position.coords.latitude, position.coords.longitude, time);
      }).catch((error) => {
        alert(JSON.stringify(error));
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
      this.quitSending();
    }

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

          <Button containerStyle={styles.visibleButton}>
                    <Text style={styles.activebuttonText}>Synlig</Text>
          </Button>
            :
            <Button containerStyle={styles.visibleButton}>
                      <Text style={styles.blackbuttonText}>Ej synlig</Text>
            </Button>
        }
          <View style={styles.slideBackground}>
          </View>


          { this.state.isSendingPos ?

            <View style={styles.isSendingcontainer}>
              <Text style={styles.sendingPosTimer}>0{this.state.hours}:{
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
