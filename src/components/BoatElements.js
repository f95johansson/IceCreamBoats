import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as location from '../utils/location';
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import BackGeo from '../components/BackGeo';
import styles from '../style/components/boatelement'


export default class BoatElements extends Component {

  componentWillMount() {
    this.isMount = true;
    this.state = {
      boats: {},
      aboutText: '',
      userEmail: ''
    };
    this.updateBoats = this.updateBoats.bind(this)
    this.identifyUser()
    firebase.database().ref('boats').on('value', this.updateBoats)
    this.loadFirebaseData()
  }

  componentWillUnmount() {
    firebase.database().ref('boats').off('value', this.updateBoats);
    this.isMount = false;
  }

  loadFirebaseData() {
    firebase.database().ref('boats').once('value', (snapshot) => {
      let snapValue = snapshot.exportVal()
      if (this.isMount){
        this.setState({ snapValue })
      }
    })
  }

  identifyUser(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (this.isMount){
          this.setState({ userEmail: user.email })
        }
      }
    })
  }

  updateBoats(snapshot) {
    this.setState({boats: snapshot.exportVal()})
  }

 

  claimBoat(name) {
    const { userEmail } = this.state;
    firebase.database().ref('boats').once('value', (snapshot) => {
      let snapValue = snapshot.exportVal();
      let owner = snapValue[name].owner;

      //if the boat is not claimed
      if (owner === undefined) {
        new BackGeo().start(name);
        console.log('Start1', name);
        this.props.setBoat(name)

        /* TODO Only one boat should be claimed
        var updateOwners = {};
        for (var boatName in this.state.boats) {
          
          updateOwners[boatName] = this.state.boats[boatName];
          if (boatName === name) {
            firebase.database().ref('boats/'+boatName)
              .update({
                owner: userEmail
              })
              .then(() => {
              }, (error) => {
                console.log('error', error);
              })
          } else {
            firebase.database().ref('boats/'+boatName)
              .update({
                owner: userEmail
              })
              .then(() => {
              }, (error) => {
                console.log('error', error);
              })
          }
        }
        */

        firebase.database().ref('boats/'+name)
          .update({
            owner: userEmail
          })
          .then(() => {
          }, (error) => {
            console.log('error', error);
          })


      }
      //else if the boat is claimed by user
      else if(owner === userEmail) {
        new BackGeo().stop(name);
        this.props.setBoat(name)
        firebase.database().ref('boats/'+name).update({
          owner: null
        }).catch((error) => {
          console.log('error', error);
        });
      }
      this.loadFirebaseData();
    });
  }

  editBoat(name) {
    this.props.editBoat(name);
  }

  renderBoats() {
    const { boats, snapValue } = this.state;
    let elements = [];
    if (snapValue === undefined) {return;}

    let i = 0
    for (var boat in boats) {
      let name = boats[boat].name;
      let isOut = boats[boat].isOut;
      let owner = boats[boat].owner;

      var checkbox = isOut ?
        require('../../assets/admin/checked/checked.png'):
        require('../../assets/admin/unchecked/unchecked.png');

      var boatclaim = owner === this.state.userEmail ?
        require('../../assets/admin/claimedBoat/claimedBoat.png'):
        require('../../assets/admin/claimBoat/claimBoat.png');

      elements.push(
        (<View key={i} style={styles.rowElements}>
          <Text key={i+1} style={styles.nameColor}>{name} </Text>

          <View style={styles.iconsRow}>
            <TouchableOpacity style={styles.icons} onPress={this.claimBoat.bind(this, name)}>
              <Image
                key={i+6}
                style={styles.icon}
                source={boatclaim}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={this.editBoat.bind(this, name)}>
              <Image
                key={i+3}
                style={styles.icon}
                source={require('../../assets/admin/edit/edit.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={this.removeBoat.bind(this, name)}>
              <Image
                key={i+5}
                style={styles.icon}
                source={require('../../assets/admin/trash/trash.png')}
                />
            </TouchableOpacity>
          </View>
        </View>)
      )
      i++
    }
    return elements
  }

  removeBoat(name) {
    firebase.database().ref('boats/'+name).remove()
  }

  render() {
    return (
      <View>
        {this.renderBoats()}
      </View>
    )
  }
}
