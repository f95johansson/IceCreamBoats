//TO BE IMPLEMENTED

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
import styles from '../../style/components/createnewadminmodal';

export default function CreateNewAdminModal(props) {
  return (
    <Modal
      offset={props.offset}
      open={props.openModal}
      overlayBackground={'rgba(255, 255, 255, 0.75)'}
      modalDidOpen={() => console.log('modal did open')}
      modalDidClose={() => props.onCreateNewAdminModalChange(false)}
      modalStyle={styles.modalStyle}>
      <View>
        <Text style={styles.modalHeader}>
          Lägg till ny administratör
        </Text>

        <TextInput 
          style={styles.textInput} 
          placeholder={'E-mail'}
          placeholderTextColor={'#bbb'}
        />
        <TextInput 
          style={styles.textInput} 
          placeholder={'Lösenord'}
          placeholderTextColor={'#bbb'}
        />
        <TextInput 
          style={styles.textInput} 
          placeholder={'Upprepa lösenord'}
          placeholderTextColor={'#bbb'}
        />
        <TextInput 
          style={styles.textInput} 
          placeholder={'För- och Efternamn'}
          placeholderTextColor={'#bbb'}
        />
        <TextInput 
          style={styles.textInput} 
          placeholder={'Telefonnummer'}
          placeholderTextColor={'#bbb'}
        />
        <TextInput 
          style={styles.textInput} 
          placeholder={'Område (Ex. Göteborgs Skärgård)'}
          placeholderTextColor={'#bbb'}
        />
        <TextInput 
          style={styles.textInput} 
          placeholder={'Sträcka (Ex. Marstrand-Kungsö)'}
          placeholderTextColor={'#bbb'}
        />
        
        <View style={{paddingTop: 10}}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => props.onCreateNewAdminModalChange(false)}>
              <Image style={styles.button} source={require('../../../assets/admin/yes.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.onCreateNewAdminModalChange(false)}>
              <Image style={styles.button} source={require('../../../assets/admin/no.png')}/>
            </TouchableOpacity>
          </View>
      </View>
      </View>
    </Modal>
  );
}