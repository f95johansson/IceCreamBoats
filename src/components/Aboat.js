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
  //Alfred removed boat icon
	return(
		<View style={{padding: 20}}>
	        <View style={{flexWrap:'wrap', flexDirection:'row', marginBottom: 8}}>
	            <Text style={{fontWeight: 'bold', fontSize: 16, marginRight: 10}}>Båt {props.index}</Text>

	            {props.out?
                <Text style={{fontWeight: 'bold', fontSize: 16, color:'#EA591C'}}>Ute nu!</Text>:
                <Text style={{color: 'grey', alignSelf:'center', fontSize: 16, fontWeight: '400'}}>I hamn</Text>}
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
