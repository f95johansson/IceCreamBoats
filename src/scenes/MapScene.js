import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Image
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

    this.sendPosition = this.sendPosition.bind(this);
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
        containerBackgroundColor={'#FFFFFF'}
        containerMinimumHeight={60}
        containerMaximumHeight={150}
        handlerHeight={60}
        initialHeight={150}
        handlerDefaultView={
          
          <Image source={require('../../assets/layout/wave.png')} style={styles.wave} />
        }>
          <View style={styles.slideBackground}>
          </View>
          <Button containerStyle={styles.buttonContainer}
                    style={styles.button}
                    onPress={this.sendPosition}>
                    Gör mig synlig för båtarna
          </Button>
          <Button containerStyle={styles.questionmark}
                    style={styles.questionmarkButton}
                    onPress={this.sendPosition}>
                    ?
          </Button>
        </SlideDownView>
    );
  }
}

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

export default class MapScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boats: {},
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
    };
    this.updateBoats.bind(this);
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
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={(e) => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              draggable
              key={marker.key}
              coordinate={marker.coordinate} />
            
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
