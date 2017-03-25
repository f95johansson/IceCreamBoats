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

  render() {
    return (
      <View style={{paddingTop: 25}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Admin</Text>
        <Button onPress={()=> {}} title="Ändra Om oss text" color="#841584"/>
        <Button onPress={()=> {}} title="Ladda upp om oss bild" color="#841584"/>
        <Button onPress={()=> {}} title="Ladda upp meny bild" color="#841584"/>

        <AdminLogin/>

        <BoatElements/>
        <BoatElements/>
      </View>
    )
  }
}
