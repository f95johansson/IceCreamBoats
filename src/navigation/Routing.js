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

const INDEX = {
  ABOUT: 0,
  MAP: 1,
  MENU: 2,
  ADMIN: 3
}

function NavButton(props) {
  return (
    <TouchableHighlight
      style={styles.NavButton}
      onPress={() => {
        if (props.index === INDEX.MAP && props.route.index !== INDEX.MAP) {
          props.navigator.popToTop();
          return;
        }

        if (props.route.index !== props.index) {
          if (props.navigator.getCurrentRoutes().length > 1) {
            props.navigator.replace(props.routes[props.index]);
          } else {
            props.navigator.push(props.routes[props.index]);
          }
        }
      }}>
      <View style={styles.iconview}>
        <Image source={props.routes[props.index].source} style={styles.icon} />
        <Text style={styles.iconText}>{props.routes[props.index].title}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default class Routing extends Component {

  constructor(props) {
    super(props);
    this.openAdmin = this.openAdmin.bind(this);
    this.setAboutPageAdminRouting = this.setAboutPageAdminRouting.bind(this);
    this.mapNavigatorObject = this.mapNavigatorObject.bind(this);76

    this.routes = [
      {scene: <About openAdmin={this.openAdmin} />, title: 'Om oss',  index: INDEX.ABOUT, source: require('../../assets/tabbar/info/info.png')},
      {scene: <MapScene />, title: 'Karta',   index: INDEX.MAP, source: require('../../assets/tabbar/map/map.png')},
      {scene: <Menu />,     title: 'Utbud',   index: INDEX.MENU, source: require('../../assets/tabbar/menu/menu.android.png')},
      {scene: <Admin />,    title: 'Admin',   index: INDEX.ADMIN, source: require('../../assets/tabbar/info/info.png')},
    ];
    this.navigator = null;
  }

  mapNavigatorObject(navigator) {
    this.setAndroidBackPressButton(navigator);
    this.setAboutPageAdminRouting(navigator);
  }

  setAndroidBackPressButton(navigator) {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.popToTop();
          return true;
      }
      return false;
    });
  }

  setAboutPageAdminRouting(navigator) {
    this.navigator = navigator;
  }

  openAdmin() {
    this.navigator.replace(this.routes[INDEX.ADMIN]);
  }

  page = (route, navigator) => {
    return (
      <View style={styles.app}>
        <View style={styles.Scene}>{route.scene}</View>
        <View>{this.bar(route, navigator)}</View>
      </View>
    );
  }

  bar = (route, navigator) => {
    return (
      <View style={styles.Routing}>
        <NavButton index={INDEX.ABOUT} routes={this.routes} route={route} navigator={navigator} />
        <NavButton index={INDEX.MAP}   routes={this.routes} route={route} navigator={navigator} />
        <NavButton index={INDEX.MENU}  routes={this.routes} route={route} navigator={navigator} />
        <NavButton index={INDEX.ADMIN} routes={this.routes} route={route} navigator={navigator} />
      </View>
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={this.routes[INDEX.MAP]}
        renderScene={this.page}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FloatFromBottom}
        ref={this.mapNavigatorObject}
      />
    );
  }
}


