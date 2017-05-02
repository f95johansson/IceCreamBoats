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

  constructor(props) {
    super(props)
    this.state = {
      boats: {},
      aboutText: ''
    }
    this.updateBoats.bind(this)
  }

  componentWillMount() {
    firebase.database().ref('boats').on('value', this.updateBoats.bind(this));
  }

  componentWillUnmount() {
    firebase.database().ref('boats').off('value', this.updateBoats.bind(this));
  }

  updateBoats(snapshot) {
    this.setState({boats: snapshot.exportVal()})
  }

  setBoat(boatName) {
    this.props.setBoat(boatName)

    firebase.database().ref('boats/' + boatName).update({
      owner: firebase.auth().currentUser.email,
    }).then(() => {
      this.setModalVisible(false)
    }, (error) => {
      console.log('error', error);
    })
  }

  renderBoats() {
    let boats = this.state.boats
    let elements = []
    let i = 0
    for (var boat in boats) {
      let name = boats[boat].boatName

      elements.push(
        <View key={i} style={styles.rowElements}>
          <Text key={i+1} style={styles.nameColor}>{name}fdf </Text>

          <View style={styles.iconsRow}>
            <TouchableOpacity style={styles.icons} onPress={this.setPosition.bind(this)}>
              <Image
                key={i+2}
                style={styles.icon}
                source={require('../../assets/admin/map/map.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={()=>{}}>
              <Image
                key={i+3}
                style={styles.icon}
                source={require('../../assets/admin/edit/edit.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={this.setBoat.bind(this, name)}>
              <Image
                key={i+4}
                style={styles.icon}
                source={require('../../assets/admin/add/add.png')}
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

  setPosition() {


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
