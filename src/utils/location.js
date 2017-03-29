import * as firebase from 'firebase';

export function getUserLocation(onSuccess, onError) {
  
}

export function uploadUserLocation(userId, latitude, longitude, time) {
  firebase.database().ref('users/'+userId).set({
    latitude: latitude,
    longitude: longitude,
    time: time,
    notified: true,
  });
}