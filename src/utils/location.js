import * as firebase from 'firebase';
import * as permissions from './permissions';

export function getUserLocation() {
  return new Promise((resolve, reject) => {
      permissions.granted().then(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
          },
          (error) => reject(error)
          //{enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
      }).catch((error) => {
        console.log(error);
        //alert('Vi måste veta er position om vi ska kunna åka till er');
      });
    }
  );
}

// 
export function uploadUserLocation(userId, oneSignalUserId, latitude, longitude, 
    time) {
  firebase.database().ref('users/'+userId).set({
    latitude: latitude,
    longitude: longitude,
    time: time,
    notified: true,
    oneSignalUserId: oneSignalUserId,
  });
}

export function uploadCurrentBoatLocation(boatName) {
  getUserLocation().then((position) => {
    uploadBoatLocation(boatName, position.coords.latitude, position.coords.longitude);
  });
}

export function uploadBoatLocation(boatName, latitude, longitude) {
  firebase.database().ref('boats/'+boatName).update({
    latitude: latitude,
    longitude: longitude,
  });
}
