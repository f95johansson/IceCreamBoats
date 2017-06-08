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
  Image,
  StatusBar
} from 'react-native';
import MapScene from '../scenes/MapScene';
import styles from '../style/routing';
import Tabs from 'react-native-tabs';

const INDEX = {
  ABOUT: 0,
  MAP: 1,
  MENU: 2,
  ADMIN: 3
};

const SCENE_NAMES = {
  INFO: 'Info',
  MAP: 'Karta',
  MENU: 'Utbud',
  ADMIN: 'Admin'
};

export default class Routing extends Component {

  componentWillMount() {
    this.openAdmin = this.openAdmin.bind(this);

    this.state = {
      page: SCENE_NAMES.MAP,
      routes :{
        [SCENE_NAMES.INFO]: {
          scene: <About openAdmin={this.openAdmin} />,
          title: SCENE_NAMES.INFO,
          index: INDEX.ABOUT,
          iconSelected: require('../../assets/tabbar/infoSelected/infoSelected.png'),
          icon: require('../../assets/tabbar/info/info.png'),
          iconWhite: require('../../assets/tabbar/infoWhite/infoWhite.png'),
        },
        [SCENE_NAMES.MAP]: {
          scene: null,
          title: SCENE_NAMES.MAP,
          index: INDEX.MAP,
          iconSelected: require('../../assets/tabbar/mapSelected/mapSelected.png'),
          icon: require('../../assets/tabbar/map/map.png'),
          iconWhite: require('../../assets/tabbar/mapWhite/mapWhite.png'),
        },
        [SCENE_NAMES.MENU]: {
          scene: <Menu />,
          title: SCENE_NAMES.MENU,
          index: INDEX.MENU,
          iconSelected: require('../../assets/tabbar/menuSelected/menuSelected.png'),
          icon: require('../../assets/tabbar/menu/menu.png'),
          iconWhite: require('../../assets/tabbar/menuWhite/menuWhite.png'),
        },
        [SCENE_NAMES.ADMIN]: {
          scene: <Admin />,
          title: SCENE_NAMES.ADMIN,
          index: INDEX.ADMIN,
          iconSelected: require('../../assets/tabbar/infoSelected/infoSelected.png'),
          icon: require('../../assets/tabbar/info/info.png'),
          iconWhite: require('../../assets/tabbar/infoWhite/infoWhite.png'),
        },
      },
    };

    this.setAndroidBackPressButton();
  }

  setAndroidBackPressButton() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.page !== SCENE_NAMES.MAP) {
        this.setState({page: SCENE_NAMES.MAP})
        return true
      }
      return false
    })
  }

  openAdmin() {
    this.setState({page: SCENE_NAMES.ADMIN})
  }

  changeView(newPage) {
    this.setState({page: newPage.props.name});
  }

  render() {
    return (
      <View style={[styles.Routing,this.state.page === SCENE_NAMES.MENU ?
      styles.MenuBackground:styles.NormalBackground]}>
        <StatusBar backgroundColor="#e6e6e6" barStyle="dark-content"/>

        <View 
        style={[styles.Scene, 
          this.state.page === SCENE_NAMES.MAP ? 
          {}: {/*width: 0, height: 0, flex: 0, paddingBottom: 0*/
               position: 'absolute'},
        ]}>
          <MapScene mounted={this.state.page === SCENE_NAMES.MAP} />
        </View>
        { this.state.page === SCENE_NAMES.MAP ?
            <View></View> :
            <View style={styles.Scene}>{this.state.routes[this.state.page].scene}</View>}

        <Tabs selected={this.state.page}
              style={[styles.Routing,this.state.page === SCENE_NAMES.MENU ?
      styles.MenuBackground:styles.NormalBackground]}
              selectedStyle={{selected: true}}
              onSelect={el => this.changeView(el)}>

            {Object.keys(this.state.routes).map((name, index) => {
              if (name !== SCENE_NAMES.ADMIN) {
                return <TabButton
                  name={this.state.routes[name].title}
                  key={this.state.routes[name].title}
                  route={this.state.routes[name]}
                  page={this.state.page}
                  styles={styles}
                  />;
              }})
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
            source={props.page === SCENE_NAMES.MENU ? props.route.iconWhite : props.route.icon}
          />
          <Text style={props.page === SCENE_NAMES.MENU ?  styles.iconTextWhite :styles.iconText}>
            {props.route.title}
          </Text>
        </View>
    );
  }
}
