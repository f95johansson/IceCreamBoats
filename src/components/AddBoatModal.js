import React, { Component } from 'react';
import { Modal, Text, View, Button, TextInput } from 'react-native';
import * as firebase from 'firebase';

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



            <Text>Båtnamn</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({boatName: text})}
                value={this.state.boatName}
                />
              <Text>Telefon</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({phone: text})}
                value={this.state.phone}
                />
              <Text>Region</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({region: text})}
                value={this.state.region}
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
          title="Lägg till båt"
          color="#841584"/>

      </View>
    );
  }
}
