import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import Communications from 'react-native-communications';
import Aboat from '../components/Aboat'
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
      MiniTitle: 'Skepp ohoj!',
      coWorkers: 'Sambarbetsparters',
      boats: []
    }
  }

  componentWillMount() {
    this.loadAboutText()
    this.loadBoats()
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
  loadBoats() {
    firebase.database().ref('boats').on('value',
    (snapshot) => {
      this.setState({
        boats: snapshot.exportVal()
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
          <View style={{flex:1, flexWrap:'wrap', flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
            {Object.keys(this.state.boats).map((boatName, index) => 
              <Aboat  key={index}
                      index= {index+1}
                      name=  {this.state.boats[boatName].boatName}
                      out=   {this.state.boats[boatName].isOut}
                      region={this.state.boats[boatName].region}
                      fromTo={this.state.boats[boatName].fromTo}
                      phone= {this.state.boats[boatName].phone}
              />)}
          </View>

          <Text style={styles.titleText}>
            {this.state.coWorkers}
          </Text>
        
        <TouchableHighlight
          onPress={() => this.props.openAdmin()}>
        <Text style={{paddingLeft: 50, fontWeight:'bold', fontStyle:'italic'}}>Admin</Text>
        </TouchableHighlight>

      </ScrollView>
    )
  }
}

