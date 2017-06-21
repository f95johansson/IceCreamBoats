import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import * as firebase from 'firebase';
import { postToArea } from '../utils/notifications';

let instance = null; // singleton

const TIMEOUT_TIME = 30*1000; //ms
const TIMEOUT_LOCATION = 3*1000; //ms

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
    this.phone = null;
    this.isSending = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.upload = this.upload.bind(this);
    this.timeOut = 0;
    this.locationTimeOut = 0;
    

    this.config = {
      enableHighAccuracy: true,
      distanceFilter: 10,
      timeOut: 20000,
      maximumAge: 1000, 
    };
  }

  start(name) {
    this.name = name;
    firebase.database().ref('boats/'+name).once('value', snapshot => {
      var boats = snapshot.exportVal();
      if (boats !== null) {
        this.phone = boats.phone;
      }
    });
    alert('Båt vald. Position updateras nu i bakgrunden');
    this.watchID = navigator.geolocation.watchPosition(this.upload, error => console.log(error), this.config);
    console.log(this.watchID);
  }

  stop(name) {
    this.name = null;
    this.phone = null;
    navigator.geolocation.clearWatch(this.watchID);
  }

  upload(location) {    
    if (this.name !== null) {// && this.isSending === false) {
      var currentTime = new Date().getTime();
      this.isSending = true;

      if(currentTime - this.locationTimeOut > TIMEOUT_LOCATION){
        this.locationTimeOut = new Date().getTime;
        firebase.database().ref('boats/' + this.name).update({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
      
      if (currentTime - this.timeOut > TIMEOUT_TIME) {
        this.timeOut = new Date().getTime();

        var message = this.phone === null ? 
            'En glassbåt är i närheten' : 
            'En glassbåt är i närheten. Ring '+this.name+' på '+this.phone+' om du inte ser båten inom en liten stund';

        postToArea(message, location.coords.latitude, location.coords.longitude)
          .then(() => {
            this.isSending = false;
          });
      }
    }
  }
}
