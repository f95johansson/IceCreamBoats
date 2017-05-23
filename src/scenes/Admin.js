import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import BoatElements from '../components/BoatElements'
import AdminLogin from '../components/AdminLogin'
import AddBoatModal from '../components/AddBoatModal'
import AddPositionModal from '../components/AddPositionModal'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Modal,
  TouchableHighlight,
  ScrollView
} from 'react-native';

export default class Menu extends Component {

  componentWillMount() {
    this.isMount = true;
    this.state = {
      showTextInput: false,
      inputText: '',
      showAddboat: false,
      isLoggedIn: false,
      name: '',
      editBoat: ''
    }

    this.loadAboutText()
  }

  componentWillUnmount(){
    this.isMount = false;
  }

  loadAboutText() {
    firebase.database().ref('about').on('value',
    (snapshot) => {
      if(this.isMount){
        this.setState({
          aboutText: snapshot.exportVal().about
        })
      }
    })
  }

  isLoggedIn(status) {
    this.setState({ isLoggedIn: status })
  }

  renderAbout() {
    return (
      <View style={{paddingTop: 30}}>
        <Text style={{textAlign: 'center', paddingBottom: 10}}>Här kan du ändra "Om oss"</Text>
        <TextInput
          multiline={true}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(aboutText) => this.setState({aboutText})}
          value={this.state.aboutText}
          />
        <Button
          onPress={ this.uploadAbout.bind(this) }
          title="Ladda upp text"
          color="#e41e13"/>
      </View>
    )
  }

  uploadAbout() {
    firebase.database().ref('about').set({
      about: this.state.aboutText
    }).then(() => {
    }, (error) => {
      console.log('error', error)
    })
  }

  setBoat(name) {
    this.setState({ name })
  }

  editBoat(name) {
    this.setState({ editBoat: name })
  }

  clearState(){
    this.setState({
      editBoat: ''
    })
  }

  render() {
    return (
      <ScrollView>
      <View style={{padding: 25}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Admin</Text>

        <AdminLogin isLoggedIn={this.isLoggedIn.bind(this)}/>

        {this.state.isLoggedIn ?
          <View>
            <BoatElements
              setBoat={this.setBoat.bind(this)}
              editBoat={this.editBoat.bind(this)}/>

            <AddBoatModal clearState={this.clearState.bind(this)} editBoat={this.state.editBoat}/>
            {this.renderAbout()}
            <AddPositionModal getBoat={this.state.name}/>
          </View>
        :[]}
      </View>
      </ScrollView>
    )
  }
}
