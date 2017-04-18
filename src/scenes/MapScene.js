import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Animated,
  PanResponder,
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import SlideDownView from '../components/SlideDownView';

import {generate} from '../utils/randomstring';
import * as location from '../utils/location';
import styles from '../style/mapscene'
import gstyles from '../style/styles'


class Overlay extends Component {

  constructor(props) {
    super(props);

    this.state = {id:''};
    this.sendPosition.bind(this);
  }

  sendPosition() {
    // to be implemented
    var id;
    var time = new Date().getTime();

    if (this.state.id === '') {
      id = generate(32);
      this.setState({id: id});
    } else {
      id = this.state.id;
    }

    location.getUserLocation().then((position) => {
        location.uploadUserLocation(id, position.coords.latitude, position.coords.longitude, time);
    }).catch((error) => {
        alert(JSON.stringify(error));
    });
  }

  render() {
    return (
      <SlideDownView style={styles.overlay}
        handlerOpacity={1}
        containerBackgroundColor={'#F5BB94'}
        containerMinimumHeight={20}
        containerMaximumHeight={190}
        handlerHeight={160}
        initialHeight={190}
        handlerDefaultView={
          <Button style={styles.notificationButton}
            onPress={this.sendPosition.bind(this)}
            title="Jag vill ha glass"
            accessibilityLabel="Nu kommer vi"
          />
        } />
    );
  }
}


let id = 0;
export default class MapScene extends Component {

  constructor(props) {
    super(props);
    this.getUserLocation()

    this.state = {
      userEmail: '',
      boatInfo: {
        name: '',
        phone: ''
      },
      boats: {},
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0500,
        longitudeDelta: 0.0500
      },
      markers: [],
    };
    this.updateBoats.bind(this);
  }

  getUserLocation() {
    location.getUserLocation().then((position) => {
        let locationData = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        this.setState({
          region: {
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            latitudeDelta: 0.0500,
            longitudeDelta: 0.0500
          }
        })
    }).catch((error) => {
        console.log('ERRRR', error)
    });
  }

  onMapPress(e) {
  this.setState({
    markers: [
      ...this.state.markers,
      {
        coordinate: e.nativeEvent.coordinate,
        key: id++,
      },
    ],
  });
}

  componentWillMount() {
    firebase.database().ref('boats').on('value', this.updateBoats.bind(this));

    //Identify user
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) { this.setState({ userEmail: user.email }, ()=> {this.getBoatInfo()}) }
    }.bind(this))
  }

  componentWillUnmount() {
   firebase.database().ref('boats').off('value', this.updateBoats.bind(this));
  }

  updateBoats(snapshot) {
    var boats = snapshot.exportVal();
    if (boats === null) {
      this.setState({boats: {}});
    } else {
      this.setState({boats: boats});
    }
  }

  getBoatInfo() {
    let userEmail = this.state.userEmail
    ref = firebase.database().ref('boats')

    ref.once('value', (snapshot) => {
      snapshot.forEach( (childSnapshot) => {
        if (childSnapshot.val().owner==userEmail) {
            this.setState({
              boatInfo: {
                          name: childSnapshot.val().boatName,
                          phone: childSnapshot.val().phone }
            })
        }
      })
    })
  }

  render() {
    //TODO: kunna ta bort en popup genom att klicka på den. Dock så funkar inte onPress för tillfället
    return (
      <View style={styles.MapScene} >
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={(e) => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
          <View>
            <MapView.Marker
              draggable
              key={marker.key}
              coordinate={marker.coordinate}
              title={this.state.boatInfo.name}
              description={'Tele: '+this.state.boatInfo.phone}
              />
            {/*BUGGY SHIT COMPONENT*/}
            <MapView.Callout tooltip={true} onPress={() => console.log('CLICKED!', 123)}/>
          </View>
          ))}
        </MapView>

        <Overlay />
      </View>
    );
  }
}

function toLatLang(object) {
  return {
    latitude: object.latitude,
    longitude: object.longitude,
  };
}
