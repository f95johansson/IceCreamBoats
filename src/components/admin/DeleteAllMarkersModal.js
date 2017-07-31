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
import styles from '../../style/components/deleteallmarkersmodal';

export default function DeleteAllMarkersModal(props) {
  return (
    <Modal
      offset={props.offset}
      open={props.openModal}
      overlayBackground={'rgba(255, 255, 255, 0.75)'}
      modalDidOpen={() => console.log('modal did open')}
      modalDidClose={() => props.onDeleteAllUsersModalChange(false)}
      modalStyle={styles.modalStyle}>
      <View>
        <Text style={styles.modalHeader}>
          Ta bort alla kunder
        </Text>
        <Text style={styles.modalText}>
          Är du säker på att du vill ta bort alla kunder? Detta går inte att åtgärda.
        </Text>
        <View style={{paddingTop: 10}}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => props.deleteUsers()}>
              <Image style={styles.button} source={require('../../../assets/admin/yes.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.onDeleteAllUsersModalChange(false)}>
              <Image style={styles.button} source={require('../../../assets/admin/no.png')}/>
            </TouchableOpacity>
          </View>
      </View>
      </View>
    </Modal>
  );
}