import React, { Component } from 'react';
import { 
  View, 
  Platform,
  Dimensions 
} from 'react-native';
import * as firebase from 'firebase';
import { postToArea } from '../utils/notifications';
import BackgroundGeolocation from 'react-native-background-geolocation';

let instance = null; // singleton
let boatname = null;
let timeOut = 0;
let phone = null;


const TIMEOUT_TIME = 10*1000; //ms

export default class BackGeo {
  constructor(props) {
    if (instance === null) {
      instance = this;
      this.setup();
      this.isSending = false;
      this.start = this.start.bind(this);
      this.stop = this.stop.bind(this);
    }
    return instance;
  }
  setup(){
    this.config = {
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      stationaryRadius: 25,
      distanceFilter: 10,
      heartbeatIntervall: 5,
      // Activity Recognition
      stopTimeout: 15,
      // Application config
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      preventSuspend: true,

      // HTTP / SQLite config
      url: 'http://yourserver.com/locations',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      headers: {              // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
    };
  }

  start(name) {
    boatname = name;
    // This handler fires whenever bgGeo receives a location update.    
    BackgroundGeolocation.on('location', this.onLocation);
    // This handler fires whenever bgGeo receives an error
    BackgroundGeolocation.on('error', this.onError);
    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);
    // This event fires when a chnage in motion activity is detected
    BackgroundGeolocation.on('activitychange', this.onActivityChange);
    // This event fires when the user toggles location-services
    BackgroundGeolocation.on('providerchange', this.onProviderChange);

    BackgroundGeolocation.configure(this.configure, function(state) {
        console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
        if (!state.enabled) {
          BackgroundGeolocation.start(function() {
            console.log("- Start success");
          });
        }
      });
    firebase.database().ref('boats/'+boatname).once('value', snapshot => {
      var boats = snapshot.exportVal();
      if (boats !== null){
        phone = boats.phone;
      }
    });
    alert('Båt vald. Position updateras nu i bakgrunden');
  }

  stop(name){
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('error', this.onError);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
    BackgroundGeolocation.un('activitychange', this.onActivityChange);
    BackgroundGeolocation.un('providerchange', this.onProviderChange);
    BackgroundGeolocation.stop();
  }


  onLocation(location, taskId) {
    console.log('- [js]location: ', JSON.stringify(location));
    firebase.database().ref('boats/' + boatname).update({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      heading: location.coords.heading,
    });
    if(boatname !== null){
      var currentTime = new Date().getTime();
      this.isSending = true;
      if (currentTime - timeOut > TIMEOUT_TIME) {
        timeOut = new Date().getTime();
        var message = this.phone === null ? 
          'En glassbåt är i närheten' : 
          'En glassbåt är i närheten. Ring '+boatname+' på '+phone+' om du inte ser båten inom en liten stund';
        postToArea(message, location.coords.latitude, location.coords.longitude)
        .then(() => {
          this.isSending = false;
        });
      }
    }
    BackgroundGeolocation.finish(taskId);
  }
  onError(error) {
    var type = error.type;
    var code = error.code;
    alert(type + " Error: " + code);
  }
  onActivityChange(activityName) {
    console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
  }
  onProviderChange(provider) {
    console.log('- Location provider changed: ', provider.enabled);    
  }
  onMotionChange(isMoving, location, taskId) {
    BackgroundGeolocation.finish(taskId);
    console.log('- [js]motionchanged: ', JSON.stringify(location));
  }
}
