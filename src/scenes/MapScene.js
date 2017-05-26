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


const boatImage = require('../../assets/map/boat2.png');
const mapPosition = require('../../assets/map/MapPosition.png');

export default class MapScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      userEmail: '',
      boatInfo: {
        name: '',
        phone: ''
      },
      boats: {},
      users: {},
      LatLng: {
        latitude: 57.886567,
        longitude: 11.585426,
      },
      region: {
        latitude: 57.886567,
        longitude: 11.585426,
        latitudeDelta: 0.0500,
        longitudeDelta: 0.0500
      },
      markers: [],
      id: 0
    };

    this.getUserLocation();
    this.updateBoats = this.updateBoats.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.onInfoModalChange = this.onInfoModalChange.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.setMounted = this.setMounted.bind(this);

    this.isMount = true;
  }

  setMounted(mounted) {
    this.isMount = mounted;
  }

  getUserLocation() {
    location.getUserLocation().then((position) => {
      let locationData = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      if (this.isMount) {
        this.setState({
          LatLng: {
            latitude: locationData.latitude,
            longitude: locationData.longitude,
          },
          region: {
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            latitudeDelta: 0.0500,
            longitudeDelta: 0.0500
          }
        });
      }
    }).catch((error) => {
      console.log('ERRRR', error);
    });
  }

  //For further development. If you want to add pins to map
  // onMapPress(e) {
  //   var coordinate = e.nativeEvent.coordinate;
  //   this.setState({
  //     id: this.state.id+1,
  //     markers: [
  //       ...this.state.markers,
  //       {
  //         coordinate: coordinate,
  //         key: this.state.id+1,
  //       },
  //     ]
  //   });
  // }            {this.state.markers.map(marker => (
  //          <View key={marker.key}>
  //            <MapView.Marker
  //              coordinate={marker.coordinate}
  //              title={this.state.boatInfo.name}
  //              description={'Tele: '+this.state.boatInfo.phone}
  //              />
  //          </View>
  //        ))}

  componentWillMount() {
    firebase.database().ref('boats').on('value', this.updateBoats);
    firebase.database().ref('users').on('value', this.updateUsers);
    this.getUserLocation();

    this.isMount = true;

    //Identify user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userEmail: user.email, admin: user ? true : false }, () => this.getBoatInfo());
      }
    });
  }

  componentWillUnmount() {
    firebase.database().ref('boats').off('value', this.updateBoats);
    firebase.database().ref('users').off('value', this.updateBoats);

    this.isMount = false;
  }

  updateBoats(snapshot) {
    var boats = snapshot.exportVal();
    if (boats === null) {
      this.setState({boats: {}});
    } else {
      this.setState({boats: boats});
    }
  }
  updateUsers(snapshot) {
    var users = snapshot.exportVal();
    if (users === null) {
      this.setState({users: {}});
    } else {
      this.setState({users});
    }
  }

  getBoatInfo() {
    let userEmail = this.state.userEmail;
    ref = firebase.database().ref('boats');

    ref.once('value', (snapshot) => {
      snapshot.forEach( (childSnapshot) => {
        if (childSnapshot.val().owner === userEmail) {
          this.setState({
            boatInfo: {
              name: childSnapshot.val().name,
              phone: childSnapshot.val().phone }
            });
          }
        });
      });
    }

    onInfoModalChange(openModal) {
      this.setState({openModal: openModal});
    }

    onRegionChange(region) {
      this.setState({region: region});
    }

    render() {
      return (
        <View style={styles.MapScene} >
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={this.state.region}
            region={null}
            onRegionChange={this.onRegionChange} >



            {Object.keys(this.state.boats).map((boatName, index) => (
              <MapView.Marker
                key={index}
                coordinate={this.state.boats[boatName]}
                title={boatName}
                description={'Tele: '+this.state.boats[boatName].phone}>
                  <Image source={boatImage} style={styles.boatImage}/>
                </MapView.Marker>
            ))}

            {/*If admin, show all users*/}
            {this.state.admin ? Object.keys(this.state.users).map((user, index) => (
              <MapView.Marker
                key={index}
                coordinate={this.state.users[user]}>
                  <Image source={mapPosition} style={styles.meImage}/>
                </MapView.Marker>
            )):[]}

            {/*If not admin, show own position*/}
            {this.state.admin? [] : <MapView.Marker
              title="Din nuvarande position"
              key="user-position"
              coordinate={this.state.LatLng}>
                <Image source={mapPosition} style={styles.meImage}/>
            </MapView.Marker>
            }
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
