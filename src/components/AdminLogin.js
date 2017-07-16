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
    /*var user = firebase.auth().currentUser;
    alert(user.email);*/
    this.isMount = true;
    this.state = {
      email: '',
      password: '',
      signedIn: false,
      message: ''
    };

    this.checkLoginStatus();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ signedIn: nextProps.isLoggedInBool });
  }

  checkLoginStatus() {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.props.isLoggedIn(true);
        this.setState({ message: '' });
      } else {
        this.props.isLoggedIn(false);
      }
    });
  }

  renderLogin(){
    return (
      <View>
        <Text style={{alignSelf:'center', margin: 6}}>E-post</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          />

        <Text style={{alignSelf:'center', margin: 6}}>Lösenord</Text>
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
      const promise = firebase.auth().signInWithEmailAndPassword(email, pass)
      promise.catch((e) => {
        this.setState({ message: e.message })
        if(this.isMount){
          this.checkLoginStatus()
        }
      })
    } else if (log==='logout') {
      if(this.isMount){
        this.isMount = false;
      }
      const promise = firebase.auth().signOut()
      promise.catch((e) => {
        this.checkLoginStatus()
        console.log(e.message)
      })
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
          <View>
          <Button
            onPress={this.handleSubmit.bind(this, 'login')}
            title="Logga in "
            color="#e41e13"/>
          <Text style={{textAlign: 'center', color: 'red', paddingTop: 20}}>
            {this.state.message}
          </Text>
        </View>}
          </View>
        )
      }
    }
