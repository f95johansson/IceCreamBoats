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
    this.name = null;
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
      alert('Båt vald. Position updateras nu i bakgrunden');
    });
  }

  start(name) {
    this.name = name;
    BackgroundGeolocation.start();
  }

  stop(name) {
    this.name = null;
    BackgroundGeolocation.stop();
  }

  upload(location) {
    postToArea('Här kommer glassen', location.latitude, location.longitude, 0.000001818511515079166);
    if (this.name !== null) {
      firebase.database().ref('boats/' + this.name).update({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }
}
