import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import Modal from 'react-native-simple-modal';
import styles from '../style/components/infomodal'

export default function InfoModal(props) {
  return (
    <Modal
      offset={props.offset}
      open={props.openModal}
      overlayBackground={'rgba(255, 255, 255, 0.75)'}
      modalDidOpen={() => console.log('modal did open')}
      modalDidClose={() => props.onInfoModalChange(false)}
      modalStyle={styles.modalStyle}>
      <View>
        <Text style={styles.modalHeader}>
          Synlighet
        </Text>
        <TouchableOpacity style={styles.modalExit} onPress={() => props.onInfoModalChange(false)}>
          <Text style={styles.cross}>
            ╳
          </Text>
        </TouchableOpacity>
        <Text style={styles.modalText}>
          Att vara synlig för båtarna innebär att 
          båtarna kan se att du önskar handla. 
          De får även veta var du är så att de kan 
          hitta dig.
        </Text>
      </View>
    </Modal>
  );
}

