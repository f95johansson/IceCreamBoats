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
import styles from '../style/components/adminlogin'
import gstyles from '../style/styles'

export default class AdminLogin extends Component {

  componentWillMount() {
    this.isMount = true;
    this.state = {
      email: 'icecreamboats2017@gmail.com',
      password: '',
      signedIn: false,
      message: ''
    }

    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.props.isLoggedIn(true)
        // User is signed in.
        if(this.isMount){
          this.setState({
            message: 'Användare '+user.email+' är inloggad',
          })
        }
      } else {
        this.props.isLoggedIn(false)
        // No user is signed in.
        console.log('not logged in')
        if(this.isMount){
          this.setState({
            message: 'Ingen användare är inloggad'
          })
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ signedIn: nextProps.isLoggedInBool })
  }

  renderLogin(){
    return (
      <View>
        <Text>Logga in</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          />
      </View>
    )
  }

  handleSubmit(log) {
    const email = this.state.email
    const pass = this.state.password

    if (log==='login') {
      this.props.isLoggedIn(true)
      const promise = firebase.auth().signInWithEmailAndPassword(email, pass)
      promise.catch((e) => {
        console.log('e.message', e.message);
        if(this.isMount){
          this.setState({
            message: e.message
          })
        }
      })
    } else if (log==='logout') {
      this.props.isLoggedIn(false)

      if(this.isMount){
        this.isMount = false;
      }
      const promise = firebase.auth().signOut()
      promise.catch( (e) => {console.log(e.message)})
    }
  }

  render() {
    return (
      <View style={{paddingBottom: 20}}>
        {this.state.signedIn ? [] : this.renderLogin()}

        {this.state.signedIn ?
          <Button
            onPress={this.handleSubmit.bind(this, 'logout')}
            title="Logga ut"
            color="#e41e13"/> :
          <Button
            onPress={this.handleSubmit.bind(this, 'login')}
            title="Logga in "
            color="#e41e13"/>}
          </View>
        )
      }
    }
