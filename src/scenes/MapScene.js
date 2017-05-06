import React, { Component } from 'react';
import MapView from 'react-native-maps';
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
import MapSceneOverlay from '../components/MapSceneOverlay';
import InfoModal from '../components/InfoModal';
import {generate} from '../utils/randomstring';
import * as location from '../utils/location';
import styles from '../style/mapscene';
import gstyles from '../style/styles';

const boatImage = require('../../assets/map/boat.png');

export default class MapScene extends Component {

  constructor(props) {
    super(props);
    this.getUserLocation();

    this.state = {
      openModal: false,
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
      id: 0
    };
    this.updateBoats = this.updateBoats.bind(this);
    this.onInfoModalChange = this.onInfoModalChange.bind(this);
  }

  getUserLocation() {
    location.getUserLocation().then((position) => {
        let locationData = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        this.setState({
          region: {
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            latitudeDelta: 0.0500,
            longitudeDelta: 0.0500
          }
        });
    }).catch((error) => {
        console.log('ERRRR', error);
    });
  }

  onMapPress(e) {
    var coordinate = e.nativeEvent.coordinate;
    this.setState({
      id: this.state.id+1,
      markers: [
        ...this.state.markers,
        {
          coordinate: coordinate,
          key: this.state.id+1,
        },
      ]
    });
  }

  componentWillMount() {
    firebase.database().ref('boats').on('value', this.updateBoats);

    //Identify user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userEmail: user.email }, () => this.getBoatInfo());
      }
    });
  }

  componentWillUnmount() {
   firebase.database().ref('boats').off('value', this.updateBoats);
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
    let userEmail = this.state.userEmail;
    ref = firebase.database().ref('boats');

    ref.once('value', (snapshot) => {
      snapshot.forEach( (childSnapshot) => {
        if (childSnapshot.val().owner==userEmail) {
            this.setState({
              boatInfo: {
                name: childSnapshot.val().boatName,
                phone: childSnapshot.val().phone }
            });
        }
      });
    });
  }
  onInfoModalChange(openModal) {
    this.setState({openModal: openModal});
  }


  render() {
    console.log(this.state.boats)
    //TODO: kunna ta bort en popup genom att klicka på den. Dock så funkar inte onPress för tillfället
    return (
      <View style={styles.MapScene} >
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={(e) => this.onMapPress(e)}>
            {this.state.markers.map(marker => (
            <View key={marker.key}>
              <MapView.Marker
                draggable
                coordinate={marker.coordinate}
                title={this.state.boatInfo.name}
                description={'Tele: '+this.state.boatInfo.phone}
                />
              <MapView.Callout tooltip={true} onPress={() => console.log('CLICKED!', 123)}/>
            </View>
            ))}
            {Object.keys(this.state.boats).map((boatName, index) => (
              <MapView.Marker
                key={index}
                coordinate={this.state.boats[boatName]}
                title={boatName}
                description={'Tele: '+this.state.boats[boatName].phone}
                image={boatImage}
                />
            ))}
        </MapView>

        <MapSceneOverlay onInfoModalChange={this.onInfoModalChange}/>

        <InfoModal
          offset={this.state.offset}
          openModal={this.state.openModal}
          onInfoModalChange={this.onInfoModalChange}/>
      </View>
    );
  }
}
