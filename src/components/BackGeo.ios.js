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
let userId = null;
let name = null;
let timeOut = 0;
let phone = null;

const TIMEOUT_TIME = 10*1000; //ms

export default class BackGeo {
  constructor(props) {
    this.state = {
      config:{
        // Geolocation Config
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        stationaryRadius: 25,
        distanceFilter: 10,
        // Activity Recognition
        stopTimeout: 10,
        // Application config
        heartbeatInterval: 30,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false,
        startOnBoot: true,
        preventSuspend: true,
      }
    };
    if (instance === null) {
      instance = this;
      this.onMotionChange = this.onMotionChange.bind(this);
      this.isSending = false;
      this.config = this.config.bind(this);
      this.addPhone = this.addPhone.bind(this);
      this.start = this.start.bind(this);
      this.stop = this.stop.bind(this);
    }
    return instance;
  }
  
  config(){
    BackgroundGeolocation.on('location', this.onLocation);// This handler fires whenever bgGeo receives a location update. 
    BackgroundGeolocation.on('error', this.onError);// This handler fires whenever bgGeo receives an error
    BackgroundGeolocation.on('motionchange', this.onMotionChange);// This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('activitychange', this.onActivityChange);// This event fires when a chnage in motion activity is detected
    BackgroundGeolocation.on('providerchange', this.onProviderChange);// This event fires when the user toggles location-services
    BackgroundGeolocation.on('heartbeat', this.onHeartbeat);
    BackgroundGeolocation.configure(this.state.config, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }

  addPhone(){
    firebase.database().ref('admins/'+userId).once('value', snapshot => {
      var user = snapshot.exportVal();
      if (user !== null){
        phone = user.phone;
        name = user.name;
      }
    });
  }

  start(id) {
    userId = id;
    this.config();
    this.addPhone();
    alert('GPS Startad. Position updateras nu i bakgrunden');
  }

  stop(){
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('heartbeat', this.onHeartbeat);
    BackgroundGeolocation.un('error', this.onError);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
    BackgroundGeolocation.un('activitychange', this.onActivityChange);
    BackgroundGeolocation.un('providerchange', this.onProviderChange);
    BackgroundGeolocation.un('heartbeat', this.onProviderChange);
    BackgroundGeolocation.stop();
  }

  onLocation(location, taskId) {
    console.log('- [js]location: ', JSON.stringify(location));
    firebase.database().ref('admins/' + userId).update({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      heading: location.coords.heading,
    });

    if(userId !== null){
      var currentTime = new Date().getTime();
      this.isSending = true;
      if (currentTime - timeOut > TIMEOUT_TIME) {
        timeOut = new Date().getTime();
        var message = this.phone === null ? 
          'En glassbåt är i närheten' : 
          'En glassbåt är i närheten. Ring '+name+' på '+phone+' om du inte ser båten inom en liten stund';
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

  onMotionChange(event) {
    console.log('- [js]motionchanged: ', JSON.stringify(event.location));
    var location = event.location;
    BackgroundGeolocation.finish(event.taskId);
  }
  
  onHeartbeat(params){
    console.log("- heartbeat: ", params.location);
  }
}
