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
import styles from '../../style/components/updateaboutusmodal';

export default function UpdateAboutUsModal(props) {
  return (
    <Modal
      offset={props.offset}
      open={props.openModal}
      overlayBackground={'rgba(255, 255, 255, 0.75)'}
      modalDidOpen={() => console.log('modal did open')}
      modalDidClose={() => props.onUpdateAboutUsModalChange(false)}
      modalStyle={styles.modalStyle}>
      <View>
        <Text style={styles.modalHeader}>
          Uppdatera text om oss
        </Text>

        <View style={{paddingTop: 10}}>
          <TextInput
            multiline={true}
            style={styles.input}
            value={props.aboutText}
            onChangeText={(aboutText) => props.aboutTextUpdate(aboutText)}
            />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => props.uploadAbout()}>
              <Image style={styles.button} source={require('../../../assets/admin/upload.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.onUpdateAboutUsModalChange(false)}>
              <Image style={styles.button} source={require('../../../assets/admin/abort.png')}/>
            </TouchableOpacity>
          </View>
      </View>
      </View>
    </Modal>
  );
}