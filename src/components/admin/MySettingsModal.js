import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from 'react-native';
import Modal from 'react-native-simple-modal';
import styles from '../../style/components/mysettingsmodal';

export default function MySettingsModal(props) {
  return (
    <Modal
      offset={props.offset}
      open={props.openModal}
      overlayBackground={'rgba(255, 255, 255, 0.75)'}
      modalDidOpen={() => console.log('modal did open')}
      modalDidClose={() => props.onMySettingsModalChange(false)}
      modalStyle={styles.modalStyle}>
      <View>
        <Text style={styles.modalHeader}>
          Mina Inställningar
        </Text>
        <Text style={styles.label}>Namn</Text>
        <TextInput 
          style={styles.textInput} 
          value={props.currentUser.name}
          placeholder={'För- och Efternamn'}
          placeholderTextColor={'#bbb'}
          onChangeText={(currentName) => props.nameUpdate(currentName)}
        />
        <Text style={styles.label}>Telefonnummer</Text>
        <TextInput 
          style={styles.textInput} 
          value={props.currentUser.phone}
          placeholder={'Telefonnummer'}
          placeholderTextColor={'#bbb'}
          onChangeText={(phoneNumber) => props.phoneUpdate(phoneNumber)}
        />
        <Text style={styles.label}>Område</Text>
        <TextInput 
          style={styles.textInput} 
          value={props.currentUser.region}
          placeholder={'Område (Ex. Göteborgs Skärgård)'}
          placeholderTextColor={'#bbb'}
          onChangeText={(currentRegion) => props.regionUpdate(currentRegion)}
        />
        <Text style={styles.label}>Sträcka</Text>
        <TextInput 
          style={styles.textInput} 
          value={props.currentUser.fromTo}
          placeholder={'Sträcka (Ex. Marstrand-Kungsö)'}
          placeholderTextColor={'#bbb'}
          onChangeText={(fromTo) => props.fromToUpdate(fromTo)}
        />
        
        <View style={{paddingTop: 10}}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => props.uploadUserInfo()}>
              <Image style={styles.button} source={require('../../../assets/admin/change.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.onMySettingsModalChange(false)}>
              <Image style={styles.button} source={require('../../../assets/admin/abort.png')}/>
            </TouchableOpacity>
          </View>
      </View>
      </View>
    </Modal>
  );
}