import React, { Component } from 'react';
import { View, Platform } from 'react-native';
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
    if (Platform.OS === 'android') {
      BackgroundGeolocation.configure({
        desiredAccuracy: 10,
        stationaryRadius: 1,
        distanceFilter: 10,
        locationTimeout: 30,
        notificationTitle: 'Du är en nu båt',
        notificationText: 'Din position kommer uppdateras i bakgrunden',
        debug: false,
        startOnBoot: false,
        stopOnTerminate: false,
        locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
        interval: 10000,
        fastestInterval: 5000,
        activitiesInterval: 10000,
        saveBatteryOnBackground: false,
        stopOnStillActivity: false
      });
    } else {
      BackgroundGeolocation.configure({
        desiredAccuracy: 10,
        stationaryRadius: 50,
        distanceFilter: 50,
        activityType: 'Fitness', //iOS, type of navigation activity, 4 = otherNavigation eg boat.
        debug: true,
        stopOnTerminate: false,
        interval: 10000,
        saveBatteryOnBackground: false,
        url: 'http://130.239.183.41:7777/save_coords'
      });
    }
    

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
  }

  start(name) {
    this.name = name;
    BackgroundGeolocation.start(() => {
      alert('Båt vald. Position updateras nu i bakgrunden');
    });
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
