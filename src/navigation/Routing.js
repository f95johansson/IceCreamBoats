import React, { Component } from 'react';
import Menu from '../scenes/Menu';
import About from '../scenes/About';
import Admin from '../scenes/Admin';
import {
  View,
  Text,
  Navigator,
  TouchableHighlight,
  StyleSheet,
  BackAndroid,
  Image
} from 'react-native';
import MapScene from '../scenes/MapScene';
import styles from '../style/routing'
import CustomTransition from './CustomTransition';
import Tabs from 'react-native-tabs';

const INDEX = {
  ABOUT: 0,
  MAP: 1,
  MENU: 2,
  ADMIN: 3
}

export default class Routing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page:'Karta',
      routes :{
        Info: {
          scene: <About openAdmin={this.openAdmin}/>, 
          title: 'Info',
          index: INDEX.ABOUT,
          iconSelected: require('../../assets/tabbar/infoSelected/infoSelected.png'),
          icon: require('../../assets/tabbar/info/info.png'),
          show: false,
        },
        Karta: {
          scene: <MapScene />, 
          title: 'Karta',   
          index: INDEX.MAP,
          iconSelected: require('../../assets/tabbar/mapSelected/mapSelected.png'),
          icon: require('../../assets/tabbar/map/map.png'),
          show: true,
        },
        Utbud: {
          scene: <Menu />,     
          title: 'Utbud',   
          index: INDEX.MENU,
          iconSelected: require('../../assets/tabbar/menuSelected/menuSelected.png'),
          icon: require('../../assets/tabbar/menu/menu.png'),
          show: false,
        },
        Admin: {
          scene: <Admin />,    
          title: 'Admin',   
          index: INDEX.ADMIN,
          iconSelected: require('../../assets/tabbar/infoSelected/infoSelected.png'), 
          icon: require('../../assets/tabbar/info/info.png'),
          show: false,
        },
      },
    }
    this.openAdmin = this.openAdmin.bind(this);
  
    this.setAndroidBackPressButton();
  }

  setAndroidBackPressButton() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.page !== 'Karta') {
        this.setState({page: 'Karta'})
        return true;
      }
      return false;
    });
  }


  openAdmin() {
    this.setState({page: 'Admin'})
  }

  changeView(newPage) {
    var newState = this.state.routes;
    // Hide old page
    // Set page to new page and show it
    newState[this.state.page].show = false;
    this.setState({page:newPage.props.name})
    newState[this.state.page].show = true;
    this.setState({routes: newState})
  }

  renderSinglePage(name, index){
    return (
          <View style={[styles.Scene, this.state.routes[name].show ? []: {width:0, height:0}]}>
          {this.state.routes[name].scene}
          </View>
        )
  }

  renderPages(){
    // Loop through routes and render each
      return (Object.keys(this.state.routes).map((name, index) => {
       this.renderSinglePage(name, index);
      }))
    }

  render() {
    return (
      <View style={styles.Routing}>
        {this.renderPages()}
        <Tabs selected={this.state.page} 
              style={{backgroundColor:'white'}}
              selectedStyle={{selected: true}} 
              onSelect={el=>this.changeView(el)}>

            {Object.keys(this.state.routes).map((name, index) => {
              if (name !== 'Admin') {
                return <TabButton 
                  name={this.state.routes[name].title} 
                  key={this.state.routes[name].title} 
                  route={this.state.routes[name]} 
                  styles={styles}
                />}
              })
            }
        </Tabs>
      </View>
    );
  }
}

function TabButton (props) {
  if (props.style && props.style[1].selected) {
    return (
        <View>
          <Image
            style={styles.icon}
            source={props.route.iconSelected}
          />
          <Text style={styles.iconTextSelected}>{props.route.title}</Text>
        </View>
    );
  } else {
    return (
        <View>
          <Image
            style={styles.icon}
            source={props.route.icon}
          />
          <Text style={styles.iconText}>{props.route.title}</Text>
        </View>
    );
  }
}
