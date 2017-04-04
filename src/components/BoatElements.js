import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput
} from 'react-native';

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
    this.setState({boats: snapshot.exportVal()});
  }

  renderBoats() {
    let boats = this.state.boats
    let elements = []

    for (var boat in boats) {
      let name = boats[boat].boatName

      elements.push(
        <View key={name} style={styles.rowElements}>
          <Text style={{color: 'red'}}>{name} </Text>
          <Text>Karta(bild) </Text>
          <Text>Penna(bild) </Text>
          <Text>Checkbox(bild) </Text>
          <Text onPress={this.removeBoat.bind(this, name)}>Ta bort(bild) </Text>
        </View>
      )
    }

    return elements
  }

  removeBoat(name) {
    console.log('name', name);
    firebase.database().ref('boats/'+name).remove()
  }

  render() {
    return (
      <View>
        <Text>Båtar</Text>
        {this.renderBoats()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowElements: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        paddingTop: 10,
    },

});
