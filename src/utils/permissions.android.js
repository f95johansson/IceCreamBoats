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

/*
async function requestLocationPermission() {
  alert('4')
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'We know were you are this summer',
        'message': 'OooooOOOoooOOOoooohhh'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}*/

function requestLocationPermission2() {
  return new Promise((resolve, reject) => PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      'title': 'We know were you are this summer',
      'message': 'OooooOOOoooOOOoooohhh'
    }
  ).then((granted) => {
    alert('4: '+granted)
    resolve(granted === PermissionsAndroid.RESULTS.GRANTED);
  }).catch((err) => {
    alert('5: '+err)
    reject(err);
  }));
}
