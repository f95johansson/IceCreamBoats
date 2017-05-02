import React, { Component } from 'react';
import { Modal, Text, View, Button, TextInput } from 'react-native';
import * as firebase from 'firebase';
//import styles from '../style/components/addpositionmodal'
import styles from '../style/components/addboatmodal'
import gstyles from '../style/styles'

  export default class AddBoatModal extends Component {

  state = {
    modalVisible: false,
    boatName: '',
    phone: '',
    region: '',
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  uploadData() {
    const { boatName, phone, region } = this.state
    let longitude = 1.2323
    let latitude = 2.2323

    firebase.database().ref('boats/' + boatName).set({
      boatName,
			phone,
			region,
			isOut: false,
      latitude,
      longitude,
    }).then(() => {
      this.setModalVisible(false)
    }, (error) => {
      console.log('error', error);
    })

  }

  render() {
    return (
      <View style={gstyles.view}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={gstyles.view}>
          <View>
            <Button
              onPress={()=>{ this.setModalVisible(!this.state.modalVisible) }}
              title="Stäng"
              color="#e41e13"/>

            <Text>Båtnamn</Text>
              <TextInput
                style={gstyles.textInput}
                onChangeText={(text) => this.setState({boatName: text})}
                value={this.state.boatName}
                />
              <Text>Telefon</Text>
              <TextInput
                style={gstyles.textInput}
                onChangeText={(text) => this.setState({phone: text})}
                value={this.state.phone}
                />
              <Text>Region</Text>
              <TextInput
                style={gstyles.textInput}
                onChangeText={(text) => this.setState({region: text})}
                value={this.state.region}
                />

              <Button
                onPress={()=>{ this.uploadData() }}
                title="Ladda upp"
                color="#e41e13"/>

          </View>
         </View>
        </Modal>

        <Button
          onPress={()=>{ this.setModalVisible(true) }}
          title="Lägg till båt"
          color="#e41e13"/>

      </View>
    );
  }
}
