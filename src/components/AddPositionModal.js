import React, { Component } from 'react';
import { Modal, Text, View, Button, TextInput } from 'react-native';
import * as firebase from 'firebase';

  export default class AddPositionModal extends Component {

  state = {
    modalVisible: false,
    destinationTime: ''
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  uploadData() {
    //TODO: REPLACE
    let longitude = 1.2323
    let latitude = 2.2323
    let boatName = this.props.getBoat

    firebase.database().ref('boats/' + boatName).update({
      destLatitude: latitude,
      destLongitude: longitude,
      destinationTime: this.state.destinationTime
    }).then(() => {
      this.setModalVisible(false)
    }, (error) => {
      console.log('error', error);
    })
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Button
              onPress={()=>{ this.setModalVisible(!this.state.modalVisible) }}
              title="Stäng"
              color="#841584"/>

            <Text>Skicka ut notis till närliggande</Text>
            <Text>Kommer om:</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({destinationTime: text})}
                value={this.state.destinationTime}
                />
              <Button
                onPress={()=>{ this.uploadData() }}
                title="Ladda upp"
                color="#841584"/>

          </View>
         </View>
        </Modal>

        <Button
          onPress={()=>{ this.setModalVisible(true) }}
          title="Skicka ut notis till närliggande"
          color="#841584"/>

      </View>
    );
  }
}
