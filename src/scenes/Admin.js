import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import BoatElements from '../components/BoatElements'
import AdminLogin from '../components/AdminLogin'
import AddBoatModal from '../components/AddBoatModal'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Modal,
  TouchableHighlight
} from 'react-native';

export default class Menu extends Component {

  componentWillMount() {
    this.state = {
      showTextInput: false,
      inputText: '',
      showAddboat: false,
      isLoggedIn: false
    }

    this.loadAboutText()
  }

  loadAboutText() {
    firebase.database().ref('about').on('value',
    (snapshot) => { 
      this.setState({
        aboutText: snapshot.exportVal().about
      })
    })
  }

  isLoggedIn(status) {
    this.setState({ isLoggedIn: status })
  }

  renderAbout() {
    return (
            <View>
              <Text>Här kan du ändra "Om oss"</Text>
              <TextInput
                multiline={true}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(aboutText) => this.setState({aboutText})}
                value={this.state.aboutText}
                />
              <Button
                onPress={ this.uploadAbout.bind(this) }
                title="Ladda upp text"
                color="#841584"/>
            </View>
          )
  }

  uploadAbout() {
    firebase.database().ref('about').set({
      about: this.state.aboutText
    }).then(() => {
    }, (error) => {
      console.log('error', error);
    })

  }
  render() {
    console.log('staet', this.state);
    return (
      <View style={{paddingTop: 25}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Admin</Text>

        <AdminLogin isLoggedIn={this.isLoggedIn.bind(this)}/>

        {this.state.isLoggedIn ?
          <View>
            <BoatElements/>
            <AddBoatModal/>
            {this.renderAbout()}
          </View>
        :[]}

      </View>
    )
  }
}
