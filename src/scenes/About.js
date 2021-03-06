import React, { Component } from 'react';
import * as firebase from 'firebase';
import Communications from 'react-native-communications';
import Hr from 'react-native-hr';
import Aboat from '../components/Aboat';
import resolveAssetSource from 'resolveAssetSource';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  StatusBar

} from 'react-native';
import styles from '../style/about';
import gstyles from '../style/styles';

let privacypolicy = 'http://freshcoast.se/privacypolicy/';
let infoImage = require('../../assets/info/BoatInfoImage.png');


export default class About extends Component {

  componentWillMount() {
    this.state = {
      AboutTitle: 'F R E S H   C O A S T',
      AboutText: 'FreshCoast är ett företag som bla bla bla bla bla bla bla bla',
      MiniTitle: 'Skepp ohoj!',
      coWorkers: 'Sambarbetspartners',
      callBoats: 'Ring Båtarna',
      admins: [],
      partnerImages: [],
    }
    this.loadBoats = this.loadBoats.bind(this);
    this.loadImages = this.loadImages.bind(this);
    this.loadAboutText = this.loadAboutText.bind(this);
    this.updateAboutText = this.updateAboutText.bind(this);
    this.updateBoats = this.updateBoats.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.calcImageHeight = this.calcImageHeight.bind(this);

    this.loadAboutText();
    this.loadBoats();
    this.loadImages();

    this.isMount = true;
  }
  componentWillUnmount(){
    firebase.database().ref('about').off('value', this.updateAboutText)
    firebase.database().ref('admins').off('value', this.updateBoats)
    firebase.database().ref('partnerImages').off('value', this.updateImages)
    this.isMount = false;

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
    firebase.database().ref('admins').on('value', this.updateBoats)
  }

  updateBoats(snapshot){
    let admins = snapshot.exportVal();
    this.setState({
      admins: admins  === null ? {} : admins
    })
  }

  loadImages() {
    func = this.updateImages
    firebase.database().ref('partnerImages').on('value', this.updateImages)
  }

  updateImages(snapshot) {
    var images = snapshot.exportVal();
      Object.keys(images).forEach(key => {
        firebase.storage().ref('Partners').child(images[key]).getDownloadURL().then(
              url => {
                if (!url) { return }
                if (this.isMount && !this.state.partnerImages.includes(url)) {
                  this.setState({partnerImages: [...this.state.partnerImages, url]});
                }
              },
        error => {console.log('About load image error: ', error)})
      });
  }

  calcImageHeight(){
    var source = resolveAssetSource(infoImage);
    return Dimensions.get('window').width/source.width*source.height;
  }

  render() {
    return (
      <ScrollView>
      <StatusBar
         barStyle="dark-content"
       />
         <Image source={infoImage} style={{flex: 1, width: null, height: this.calcImageHeight()}} resizeMode="stretch" />
          <Text style={styles.titleText}>
            {this.state.AboutTitle}
          </Text>
          <Text style={styles.baseText}>
            {this.state.aboutText}
          </Text>

          <Text style={styles.titleTextNotBold}>
            {this.state.callBoats}
          </Text>

          <View style={styles.boatView}>
            {Object.keys(this.state.admins).map((userId, index) =>
              <Aboat  key={index}
                      index= {index+1}
                      name=  {this.state.admins[userId].name}
                      out=   {this.state.admins[userId].isOut}
                      region={this.state.admins[userId].region}
                      fromTo={this.state.admins[userId].fromTo}
                      phone= {this.state.admins[userId].phone}
              />
              )}
          </View>
          
          <Text style={styles.titleTextNotBold}>
            {this.state.coWorkers}
          </Text>
          <View style={styles.logoView}>
            {this.state.partnerImages.map(image => <Image key={image} source={{uri: image, width: 90, height: 90}} style={styles.logoImage}/>)}
          </View>

        <TouchableOpacity
          onPress={() => this.props.openAdmin()}>
        <Text style={styles.adminLogin}>Admin login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openURL(privacypolicy)}>
          <Text style={styles.privacyPolicy}>
            Sekretesspolicy
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}


function openURL(url) {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
  }); 
}
