import {PermissionsAndroid} from 'react-native';

export function granted() {
  return new Promise((resolve, reject) => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then((granted) => {
        if (granted) {
          resolve();
        } else {
          requestLocationPermission2().then((granted) => {
            if (granted) {
              resolve();
            } else {
              reject();
            }
          }).catch((err) => {
            reject();
          });
        }
      });
    });
}

function requestLocationPermission2() {
  return new Promise((resolve, reject) => PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      'title': 'Glassbåtarna',
      'message': 'Vi behöver veta din position för att se var du är'
    }
  ).then((granted) => {
    resolve(granted === PermissionsAndroid.RESULTS.GRANTED);
  }).catch((err) => {
    reject(err);
  }));
}
