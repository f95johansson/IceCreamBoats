import OneSignal from 'react-native-onesignal'; // Import package from node modules
import * as firebase from 'firebase';
import * as permissions from './permissions';

// Time treshold for users to cutoff in seconds, 14400 seconds = 4 hours
const TIME_THRESHOLD = 14400;
const RADIUS = 2000; //m

// message should be a string, posts a notification to a single user.
// userId should be a oneSignal device userId
export function postNotification (message, userId) {
  try {
    contents = {
      'en': message
    };
    OneSignal.postNotification(contents, {}, userId);
  } catch(e) {
    console.log ("ERROR, COULD NOT SEND NOTIFICATION: " + e)
  }
}

export function askForNotificationPermition(){
  var permissions = {
    alert: true,
    badge: true,
    sound: true
  }
  OneSignal.requestPermissions(permissions);
  OneSignal.registerForPushNotifications();
  
}

//Check if the given user latitude and longitude is within the radius of the
//boat's longitude and latitude
function inArea(radius, boatLat, boatLong, userLat, userLong) {
  return differenceInLatitudeLongitude(userLat, userLong, boatLat, boatLong) < radius;
}

//Check if the given time signature is within the allowed time threshold
function inTime (userTimeSignature, allowedTimeThreshold) {
  currentTime = Math.floor(new Date().getTime()/1000);
  allowedTime = currentTime - allowedTimeThreshold;
  return userTimeSignature > allowedTime
}

function postToUsersInArea (message, users, latitude, longitude, radius=RADIUS, resolve) {
  //Filter users to check if they're within the right time and longitude 
  //latitude

  Object.keys(users).forEach(userId => {
    var user = users[userId];
    if (inTime(user.time, TIME_THRESHOLD)) {
      if (inArea(radius, latitude, longitude, user.latitude, user.longitude)) {
        if (user.notified === false) {
          firebase.database().ref('users/'+userId).update({notified: true}).then(() => {
            resolve();
          }).catch(() => {
            reject();
          });
          postNotification(message, userId);
        }
      }
    } else {
      firebase.database().ref('users/'+userId).remove();
    }
  });
}


// Loops through all the users in the firebase and filters them based on time
// signature as well as post a notification ot them
export function postToArea (message, latitude, longitude) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('users')
    .once('value', snapshot => {
      var users = snapshot.exportVal();
      if (users !== null) {
        postToUsersInArea (message, users, latitude, longitude, RADIUS, resolve);
      }
    });
  });
  
}

/**
 * Haversine formula, dinstance in latitude and longitude
 */ 
function differenceInLatitudeLongitude(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}
