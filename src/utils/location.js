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
export function uploadUserLocation(userId, latitude, longitude,
    time) {
  firebase.database().ref('users/'+userId).set({
    latitude: latitude,
    longitude: longitude,
    time: time,
    notified: true,
    
  });
}

export function uploadCurrentBoatLocation(name) {
  getUserLocation().then((position) => {
    uploadBoatLocation(name, position.coords.latitude, position.coords.longitude);
  });
}

export function uploadBoatLocation(name, latitude, longitude) {
  firebase.database().ref('boats/'+name).update({
    latitude: latitude,
    longitude: longitude,
  });
}

export function deleteUserLocation(userId) {
 firebase.database().ref('users/'+userId).remove();
}
export function getUserTimeStamp(userId) {

  return new Promise((resolve, reject) => {
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    resolve(snapshot.exportVal().time);
  }).catch((err) => {
    console.log(err)
  });
  });
}
