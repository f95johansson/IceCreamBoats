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
    this.mapNavigatorObject = this.mapNavigatorObject.bind(this);

      //Admin: {scene: <Admin />,    title: 'Admin',   index: INDEX.ADMIN, 
      //iconSelected: require('../../assets/tabbar/infoSelected/infoSelected.png'), icon: require('../../assets/tabbar/info/info.png')},
    this.routes = {
      Info: {scene: <About openAdmin={this.openAdmin} />, title: 'Info',  index: INDEX.ABOUT, 
        iconSelected: require('../../assets/tabbar/infoSelected/infoSelected.png'), icon: require('../../assets/tabbar/info/info.png')},
      Karta: {scene: <MapScene />, title: 'Karta',   index: INDEX.MAP, 
        iconSelected: require('../../assets/tabbar/mapSelected/mapSelected.png'), icon: require('../../assets/tabbar/map/map.png')},
      Utbud: {scene: <Menu />,     title: 'Utbud',   index: INDEX.MENU, 
        iconSelected: require('../../assets/tabbar/menuSelected/menuSelected.png'), icon: require('../../assets/tabbar/menu/menu.png')},
    };
    this.navigator = null;

    this.state = {page:'Karta'};
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
    this.setState({page: 'Admin'})
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
      <View style={styles.Routing}>
        <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
              selectedStyle={{selected: true}} onSelect={el=>this.setState({page:el.props.name})}>
            {Object.keys(this.routes).map((name, index) => 
                <TabButton 
                  name={this.routes[name].title} key={this.routes[name].title} route={this.routes[name]} styles={styles}
                />)
            }
        </Tabs>
        <View style={styles.Scene}>{this.routes[this.state.page].scene}</View>
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

