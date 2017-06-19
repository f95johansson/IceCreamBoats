import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Communications from 'react-native-communications';
import styles from '../style/components/aboat'

export default function Aboat(props){
	return(
    <TouchableOpacity onPress={() => Communications.phonecall(props.phone, props.owner ? true : false)}>
    	<View style={styles.container}>
        <View style={styles.info}>
        
            <Text style={styles.boatNr}>Båt {props.index}</Text>
            {props.out?
              <Text style={styles.isOut}>Ute nu!</Text>:
              <Text style={styles.notOut}>I hamn</Text>}
        </View>
        <Text style={styles.boldtext}>Förare</Text>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.boldtext}>Område</Text>
        <Text style={styles.text}>{props.region}</Text>
        <Text style={styles.boldtext}>Sträcka</Text>
        <Text style={styles.text}>{props.fromTo}</Text>
        	<View style={styles.phone}>
          		<Image source={require('../../assets/info/phone.png')} style={styles.phoneImage}/>
          		<Text style={styles.call}>Ring</Text>
        	</View>
      </View>
    </TouchableOpacity>
	)
}
