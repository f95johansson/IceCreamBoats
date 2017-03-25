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

class Overlay extends Component {
  onPress() {
    if (this.map) {
      // to be implemented
    }
  }

  render() {
    return (
      <Animated.View style={styles.overlay}>
        <Button
          onPress={this.onPress}
          title="Jag vill ha glass"
          accessibilityLabel="Nu kommer vi"
        />
      </Animated.View>
    );
  }
}

export default class MapScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boats: {},
    };

    firebase.database().ref('boats').on('value', (snapshot) => {
      this.setState({boats: snapshot.exportVal()});
    });
  }

  render() {
    return (
      <View style={styles.MapScene} >
        <Text></Text>
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
              coordinate={toLatLang(this.state.firebase[name])}
              title={this.state.firebase[name].boatname}
              key={this.state.firebase[name].boatname} >
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
    backgroundColor: '#f9f9f9',
    height: 200,
  },
});