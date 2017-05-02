import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import Communications from 'react-native-communications';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import styles from '../style/about'
import gstyles from '../style/styles'

export default class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      AboutTitle: 'F R E S H   C O A S T',
      AboutText: 'FreshCoast är ett företag som bla bla bla bla bla bla bla bla',
      MiniTitle: 'Skepp ohoj!'
    }
  }

  componentWillMount() {
    this.loadAboutText()
    //TODO: fixa checkbox, fixa lifecycle varningar
  }

  loadAboutText() {
    firebase.database().ref('about').on('value',
    (snapshot) => {
      this.setState({
        aboutText: snapshot.exportVal().about
      })
    })
  }

  render() {
    return (
      <ScrollView>
         <Image source={require('../../assets/info/InfoImage.jpg')} style={{width: 450, height: 190}} />
          <Text style={styles.titleText}>
            {this.state.AboutTitle}
          </Text>
          <Text style={styles.miniTitle}>
            {this.state.MiniTitle}
          </Text>
          <Text style={styles.baseText}>
            {this.state.aboutText}
          </Text>
          <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent: 'center',}}>
            <View style={{padding: 20}}>
              <View style={{flexWrap:'wrap', flexDirection:'row'}}>
                <Image source={require('../../assets/info/boat.png')} style={{height: 13, width: 30, top: 5, marginRight: 10}}/>
                <Text style={{fontWeight: 'bold', fontSize: 16, marginRight: 10,}}>Båt 1</Text>
                <Text style={{fontWeight: 'bold', fontSize: 16, color:'#EA591C'}}>Ute nu!</Text>
              </View>
              <Text style={{fontStyle: 'italic'}}>Norra Skärgården</Text>
              <Text style={{fontStyle: 'italic'}}>Marstrand-Mollösund</Text>
              <Text style={{fontStyle: 'italic', fontWeight:'bold', paddingTop: 11, paddingBottom: 5}}>Oscar Nilsson</Text>
              <TouchableOpacity onPress={() => Communications.phonecall('0123456789', true)}>
                <View style={{flexWrap:'wrap', flexDirection: 'row'}}>
                  <Image source={require('../../assets/info/phone.png')} style={{height: 25, width: 25,}}/>
                  <Text style={{paddingLeft: 10, top: 2}}>Ring</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{padding: 20}}>
              <View style={{flexWrap:'wrap', flexDirection:'row'}}>
                <Image source={require('../../assets/info/boat.png')} style={{height: 13, width: 30, top: 5, marginRight: 10}}/>
                <Text style={{fontWeight: 'bold', fontSize: 16, marginRight: 10,}}>Båt 2</Text>
                <Text style={{fontWeight: 'bold', fontSize: 16, color:'#EA591C'}}>Ute nu!</Text>
              </View>
              <Text style={{fontStyle: 'italic'}}>Göteborgs-Skärgård</Text>
              <Text style={{fontStyle: 'italic'}}>Kungsö Marstrand</Text>
              <Text style={{fontStyle: 'italic', fontWeight:'bold', paddingTop: 11, paddingBottom: 5}}>Patrik Ågren</Text>
              <TouchableOpacity onPress={() => Communications.phonecall('0123456789', true)}>
                <View style={{flexWrap:'wrap', flexDirection: 'row'}}>
                  <Image source={require('../../assets/info/phone.png')} style={{height: 25, width: 25,}}/>
                  <Text style={{paddingLeft: 10, top: 2}}>Ring</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        
        <TouchableHighlight
          onPress={() => this.props.openAdmin()}>
        <Text style={{paddingLeft: 50, fontWeight:'bold', fontStyle:'italic'}}>Admin</Text>
        </TouchableHighlight>

      </ScrollView>
    )
  }
}

