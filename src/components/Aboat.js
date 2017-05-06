import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Communications from 'react-native-communications';

export default function Aboat(props){
	return(
		<View style={{padding: 20}}>
	        <View style={{flexWrap:'wrap', flexDirection:'row'}}>
	            <Image source={require('../../assets/info/boat.png')} style={{height: 13, width: 30, top: 5, marginRight: 10}}/>
	            <Text style={{fontWeight: 'bold', fontSize: 16, marginRight: 10,}}>Båt {props.index}</Text>
	            <Text style={{fontWeight: 'bold', fontSize: 16, color:'#EA591C'}}>{props.out? 'Ute nu!': 'I hamn'}</Text>
	        </View>
	            <Text style={{fontStyle: 'italic'}}>{props.region}</Text>
	            <Text style={{fontStyle: 'italic'}}>{props.fromTo}</Text>
	            <Text style={{fontStyle: 'italic', fontWeight:'bold', paddingTop: 11, paddingBottom: 5}}>{props.name}</Text>
              	<TouchableOpacity onPress={() => Communications.phonecall(props.phone, true)}>
                	<View style={{flexWrap:'wrap', flexDirection: 'row'}}>
                  		<Image source={require('../../assets/info/phone.png')} style={{height: 25, width: 25,}}/>
                  		<Text style={{paddingLeft: 10, top: 2}}>Ring</Text>
                	</View>
              	</TouchableOpacity>
	        </View>
	)
}
