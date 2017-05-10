import React, { Component } from 'react';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import Communications from 'react-native-communications';
import Aboat from '../components/Aboat'
import {
  Dimensions,
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

  componentWillMount() {
    this.state = {
      AboutTitle: 'F R E S H   C O A S T',
      AboutText: 'FreshCoast är ett företag som bla bla bla bla bla bla bla bla',
      MiniTitle: 'Skepp ohoj!',
      coWorkers: 'Sambarbetsparters',
      boats: [],
      partnerImages: [],
    }
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.loadBoats = this.loadBoats.bind(this);
    this.loadImages = this.loadImages.bind(this);
    this.loadAboutText = this.loadAboutText.bind(this);
    this.updateAboutText = this.updateAboutText.bind(this);
    this.updateBoats = this.updateBoats.bind(this);
    this.updateImages = this.updateImages.bind(this)


    this.loadAboutText()
    this.loadBoats()
    this.loadImages();
    

    //TODO: fixa checkbox, fixa lifecycle varningar
  }
  componentWillUnmount(){
    firebase.database().ref('about').off('value', this.updateAboutText)
    firebase.database().ref('boats').off('value', this.updateBoats)
    firebase.database().ref('partnerImages').off('value', this.updateImages)
  }

  loadAboutText() {
    firebase.database().ref('about').on('value', this.updateAboutText)
  }

  updateAboutText(snapshot){
    this.setState({
        aboutText: snapshot.exportVal().about
    })
  }

  loadBoats() {
    firebase.database().ref('boats').on('value', this.updateBoats)
  }

  updateBoats(snapshot){
    this.setState({
      boats: snapshot.exportVal()
    })
  }

  loadImages() {
    firebase.database().ref('partnerImages').on('value', this.updateImages)
  }

  updateImages(snapshot) {
    var images = snapshot.exportVal();
        Object.keys(images).forEach(key => {
          firebase.storage().ref('Partners').child(images[key]).getDownloadURL().then(
                url => {
                  if (!this.state.partnerImages.includes(url)) {
                    this.setState({partnerImages: [...this.state.partnerImages, url]});
                  }
                },
                error => {alert(JSON.stringify(error))
            });
        });
  }

  render() {
    return (
      <ScrollView>
         <Image source={require('../../assets/info/InfoImage.jpg')} style={{flex: 1, width: null, height: 180}} resizeMode="stretch" />
          <Text style={styles.titleText}>
            {this.state.AboutTitle}
          </Text>
          <Text style={styles.miniTitle}>
            {this.state.MiniTitle}
          </Text>
          <Text style={styles.baseText}>
            {this.state.aboutText}
          </Text>

          <View style={styles.boatView}>
            {Object.keys(this.state.boats).map((name, index) =>
              <Aboat  key={index}
                      index= {index+1}
                      name=  {this.state.boats[name].name}
                      out=   {this.state.boats[name].isOut}
                      region={this.state.boats[name].region}
                      fromTo={this.state.boats[name].fromTo}
                      phone= {this.state.boats[name].phone}
              />)}
          </View>
          <Text style={styles.titleText}>
            {this.state.coWorkers}
          </Text>

          <View style={{flex:1,
                        flexWrap:'wrap',
                        flexDirection: 'row',
                        alignItems:'center',
                        justifyContent: 'center'}}>
            {this.state.partnerImages.map(image => {console.log(image); return <Image key={image} source={{uri: image, width: 110, height: 110}} style={{margin:10}}/>})}
          </View>

        <TouchableHighlight
          onPress={() => this.props.openAdmin()}>
        <Text style={{paddingLeft: 50, fontWeight:'bold', fontStyle:'italic'}}>Admin</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}
