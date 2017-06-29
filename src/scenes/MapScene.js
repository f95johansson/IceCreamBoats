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
import flattenStyle from 'flattenStyle';
import styles from '../style/mapscene';
import gstyles from '../style/styles';


const boatImage = require('../../assets/map/boat2.png');
const mapPosition = require('../../assets/map/MapPosition.png');
const notifiedPosition = require('../../assets/map/notifiedposition.png');

export default class MapScene extends Component {

  constructor(props) {
    super(props);
    this.isMount = true;
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

    this.regionSet = false;
    this.userPositionSet = false;
    this.getUserLocation();
    this.updateBoats = this.updateBoats.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.onInfoModalChange = this.onInfoModalChange.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.setMounted = this.setMounted.bind(this);

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
        this.regionSet = true;
      }
    }).catch((error) => {
      console.log('ERRRR', error);
    });
  }

  componentWillMount() {
    firebase.database().ref('boats').on('value', this.updateBoats);
    firebase.database().ref('users').on('value', this.updateUsers);

    this.getUserLocation();
    this.isMount = true;
    //Identify user
    this.authStateChanged();
  }

  authStateChanged(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({userEmail: user.email, admin: true}, () => this.getBoatInfo());
      }
      else {
        console.log('Loggade ut.');
        this.setState({admin: false});
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
              phone: childSnapshot.val().phone
            }
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
    initialRegionSet() {
      if(this.props.mounted === true && (this.regionSet === false || this.userPositionSet === false)){
        if (this.userPositionSet === true) { 
          this.regionSet = true;
        }
        return this.state.region;
      } else {
        return null;
      }
    }

    render() {
      return (
        <View style={styles.MapScene} >
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={this.state.region}
            region={this.initialRegionSet()}
            onRegionChange={this.onRegionChange} >

            {Object.keys(this.state.boats).map((boatName, index) => {
              return(this.state.boats[boatName].owner ? <MapView.Marker
                key={index}
                coordinate={this.state.boats[boatName]}
                title={boatName}
                description={'Tele: '+this.state.boats[boatName].phone}>
                  <Image source={boatImage} style={styles.boatImage}/>
                </MapView.Marker> : []
            )})}

            {/*If admin, show all users*/}
            {this.state.admin ? Object.keys(this.state.users).map((user, index) => (
              <MapView.Marker
                title="Intresserad Kund"
                description={this.state.users[user].notified ? 'Notifierad.' : 'Inte notifierad.' }
                key={index}
                coordinate={this.state.users[user]}>
                  {this.state.users[user].notified ? 
                    <Image source={notifiedPosition} style={styles.meImage}/> :
                    <Image source={mapPosition} style={styles.meImage}/>  
                  }
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
