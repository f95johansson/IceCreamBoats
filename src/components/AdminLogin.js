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

export default class AdminLogin extends Component {

  componentWillMount() {
    this.state = {
      email: 'icecreamboats2017@gmail.com',
      password: 'Lösenord',
      signedIn: false,
      message: '',
    }

    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        // User is signed in.
        this.setState({
          signedIn: true,
          message: 'Användare '+user.email+' är inloggad',
        })
        console.log('user.email:', user.email);

      } else {
        // No user is signed in.
        console.log('not logged in')
        this.setState({
          message: 'Ingen användare är inloggad'
        })
      }
    })
  }

  renderLogin(){
    return (
      <View>
        <Text>Logga in</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          />
      </View>
    )
  }

  handleSubmit(log) {
    const email = this.state.email
    const pass = this.state.password

    if (log=='login') {
      const promise = firebase.auth().signInWithEmailAndPassword(email, pass)

      promise.catch((e) => {
        console.log('e.message', e.message);
        this.setState({
          message: e.message
        })
      })
    } else if (log=='logout') {
      this.setState({
        signedIn: false
      });
      const promise = firebase.auth().signOut()
      promise.catch( (e) => {console.log(e.message)})
    }
  }

  render() {
    return (
      <View>
        {this.state.signedIn ? [] : this.renderLogin()}

        {this.state.signedIn ?
          <Button
          onPress={this.handleSubmit.bind(this, 'logout')}
          title="Logga ut"
          color="#841584"/> :
          <Button
            onPress={this.handleSubmit.bind(this, 'login')}
            title="Logga in "
            color="#841584"/>}
          </View>
        )
      }
    }
