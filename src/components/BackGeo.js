import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import { postToArea } from '../utils/notifications';

let instance = null; // singleton

export default class BackGeo {

  constructor() {
    if (instance === null) {
      instance = this;
      this.setup();
    }
    return instance;
  }

  getInstance() {
    return new BackGeo();
  }

  setup() {
    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 1,
      distanceFilter: 50,
      locationTimeout: 30,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false
    });

    BackgroundGeolocation.on('location', (location) => {
      //handle your locations here
      this.upload(location);
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      //handle stationary locations here
      this.upload(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      alert('[ERROR] BackgroundGeolocation error:'+JSON.stringify(error));
    });

    BackgroundGeolocation.start(() => {
      alert('[DEBUG] BackgroundGeolocation started successfully');    
    });
  }

  start() {
    BackgroundGeolocation.start();
  }

  stop() {
    BackgroundGeolocation.stop();
  }

  upload(location) {
    //postToArea('Här kommer glassen', location.latitude, location.longitude, 0.000001818511515079166);
    firebase.database().ref('owners/'+firebase.auth().currentUser.email).once((owner) => {
      if (owner !== null) {
        firebase.database().ref('boats/' + owner.boatName).update({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    });
  }
}
