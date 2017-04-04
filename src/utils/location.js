import * as firebase from 'firebase';

export function getUserLocation() {
  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => reject(error)
        //{enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
      );
    }
  );
}

export function uploadUserLocation(userId, latitude, longitude, time) {
  firebase.database().ref('users/'+userId).set({
    latitude: latitude,
    longitude: longitude,
    time: time,
    notified: true,
  });
}