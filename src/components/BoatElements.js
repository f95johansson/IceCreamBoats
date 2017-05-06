import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as location from '../utils/location' //TODO: funkar ej att importera
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styles from '../style/components/boatelement'

export default class BoatElements extends Component {

  componentWillMount() {
    this.state = {
      boats: {},
      aboutText: '',
      userEmail: ''
    }

    this.updateBoats.bind(this)
    this.identifyUser()
    firebase.database().ref('boats').on('value', this.updateBoats.bind(this))
    this.loadFirebaseData()
  }

  loadFirebaseData() {
    let snapValue
    firebase.database().ref('boats').once('value', (snapshot) => { snapValue = snapshot.exportVal()} )
    this.setState({ snapValue })
  }

  componentWillUnmount() {
    firebase.database().ref('boats').off('value', this.updateBoats.bind(this));
  }

  identifyUser(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userEmail: user.email })
      }
    })
  }

  updateBoats(snapshot) {
    this.setState({boats: snapshot.exportVal()})
  }

  isOut(name) {
    let snapValue
    firebase.database().ref('boats').once('value', (snapshot) => { snapValue = snapshot.exportVal()} )
    let isOut = snapValue[name].isOut
    snapValue[name].isOut = !isOut
    this.setState({ snapValue })

    firebase.database().ref('boats/' + name).update({
      isOut: isOut ? false : true,
    }).then(() => {
      //this.setModalVisible(false)
    }, (error) => {
      console.log('error', error);
    })
  }

  claimBoat(name) {
    const { userEmail } = this.state
    let snapValue
    firebase.database().ref('boats').once('value', (snapshot) => { snapValue = snapshot.exportVal()} )
    let owner = snapValue[name].owner

    //if the boat is not claimed
    if (owner==null) {
      this.props.setBoat(name)
      firebase.database().ref('boats/' + name).update({
        owner: userEmail,
      }).then(() => {
      }, (error) => {
        console.log('error', error);
      })
    }
    //else if the boat is claimed by user
    else if(owner==userEmail) {
      this.props.setBoat(name)
      firebase.database().ref('boats/' + name).update({
        owner: null,
      }).then(() => {
      }, (error) => {
        console.log('error', error);
      })
    }
    this.loadFirebaseData()
  }

  editBoat(name) {
    this.props.editBoat(name)
  }

  renderBoats() {
    const { boats, snapValue } = this.state
    let elements = []
    let i = 0
    for (var boat in boats) {
      let name = boats[boat].name
      let isOut = snapValue[name].isOut
      let owner = snapValue[name].owner

      var checkbox = isOut ?
      require('../../assets/admin/checked/checked.png'):
      require('../../assets/admin/unchecked/unchecked.png')

      var boatclaim = owner ?
      require('../../assets/admin/claimedBoat/claimedBoat.png'):
      require('../../assets/admin/claimBoat/claimBoat.png')

      elements.push(
        <View key={i} style={styles.rowElements}>
          <Text key={i+1} style={styles.nameColor}>{name} </Text>

          <View style={styles.iconsRow}>
            <TouchableOpacity style={styles.icons} onPress={this.isOut.bind(this, name)}>
              <Image
                key={i+4}
                style={styles.icon}
                source={checkbox}
                />
            </TouchableOpacity>

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
        </View>
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
