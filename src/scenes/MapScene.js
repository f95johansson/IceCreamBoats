import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Animated,
  PanResponder,
  Button
} from 'react-native';
import * as firebase from 'firebase';
import SlideDownView from '../components/SlideDownView';

import {generate} from '../utils/randomstring';
import * as location from '../utils/location';


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

export default class MapScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boats: {},
    };
    this.updateBoats.bind(this);
  }

  componentWillMount() {
    firebase.database().ref('boats').on('value', this.updateBoats.bind(this));
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

  render() {
    return (
      <View style={styles.MapScene} >
        <MapView 
            style={styles.map}
            ref={(map) => {this.map = map;}}
            region={{
              latitude: 57.653263,
              longitude: 11.777580,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }} >
            
          {Object.keys(this.state.boats).map((name, index) => (
            <MapView.Marker
              draggable
              coordinate={toLatLang(this.state.boats[name])}
              title={this.state.boats[name].boatname}
              key={index} >
              {/*<MapView.Callout>
                <Text style={{width: 50, height: 50}}>{this.state.firebase[name].boatname}</Text>
              </MapView.Callout>*/}
            </MapView.Marker>
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

var styles = StyleSheet.create({
  map: {
    flex: 1
  },
  MapScene: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 200,
  },

});