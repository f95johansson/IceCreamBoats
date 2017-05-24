import OneSignal from 'react-native-onesignal'; // Import package from node modules
import * as firebase from 'firebase';
import * as permissions from './permissions';

// Time treshold for users to cutoff in seconds, 14400 seconds = 4 hours
TIME_THRESHOLD = 14400

// message should be a string, posts a notification to a single user.
// userId should be a oneSignal device userId
export function postNotification (message, userId) {
  console.log('I am in postNotification')
  try {
    contents = {
      'en': message,
    }
    OneSignal.postNotification(contents, [], userId);
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
function inArea (radius, boatLong, boatLat, userLong, userLat) {
  // Check if satisfied (c_x - x)^2 + (c_y - y)^2 < r^2
  return (((userLong - boatLong)^2 + (userLat - boatLat)^2) < radius^2)
}

//Check if the given time signature is within the allowed time threshold
function inTime (userTimeSignature, allowedTimeThreshold) {
  currentTime = Math.floor(new Date().getTime()/1000);
  allowedTime = currentTime - allowedTimeThreshold;
  return userTimeSignature > allowedTime
}

function postToUsersInArea (message, users, longitude, latitude, radius) {
  //Filter users to check if they're within the right time and longitude 
  //latitude
  
  Object.keys(users).filter(u => inTime(users[u].time, TIME_THRESHOLD)).filter(u =>
    inArea(radius,longitude,latitude, users[u].longitude, users[u].latitude)).map(u =>
      postNotification(message,users[u].oneSignalUserId)
    )
}


// Loops through all the users in the firebase and filters them based on time
// signature as well as post a notification ot them
export function postToArea (message, longitude, latitude, radius) {
  firebase.database().ref('users').once('value', (snapshot =>
    postToUsersInArea (message, snapshot.exportVal(), longitude, latitude, radius)
    )
  )
  
}
