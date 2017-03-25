import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import BoatElements from '../components/BoatElements'
import AdminLogin from '../components/AdminLogin'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput
} from 'react-native';

export default class Menu extends Component {

  componentWillMount() {
    this.state = {
      showTextInput: false,
      inputText: ''
    }
  }

  renderTextInput(){
    return (
            <TextInput
              multiline={true}
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(inputText) => this.setState({inputText})}
              value={this.state.inputText}
              />
           )
  }

  render() {
    return (
      <View style={{paddingTop: 25}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Admin</Text>

        {this.state.showTextInput ? this.renderTextInput() : []}
        {this.state.showTextInput ?
          <View>
            <Button
              onPress={() => {this.setState({showTextInput: false})}}
              title="Ladda upp text"
              color="#841584"/>
            <Button
              onPress={() => {this.setState({showTextInput: false})}}
              title="Stäng"
              color="#841584"/>
          </View> :
        <Button
          onPress={() => {this.setState({showTextInput: true})}}
          title="Ändra 'Om oss' text"
          color="#841584"/>}

        <AdminLogin/>

        <BoatElements/>
        <BoatElements/>
      </View>
    )
  }
}
