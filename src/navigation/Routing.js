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


var openAdminState = {
  open: () => {}
}
//Here is where the views goes
const routes = [
    {scene: <About openAdmin={openAdminState} />, title: 'Om oss', index: 0, source: require('../../assets/tabbar/info/info.png')},
    {scene: <MapScene />, title: 'Karta', index: 1, source: require('../../assets/tabbar/map/map.png')},
    {scene: <Menu />, title: 'Utbud', index: 2, source: require('../../assets/tabbar/menu/menu.android.png')},
    {scene: <Admin />, title: 'Admin', index: 3, source: require('../../assets/tabbar/info/info.png')},
  ];

function NavButton(props) {
  return (
    <TouchableHighlight
      style={styles.NavButton}
      onPress={() => {
        if (props.index === 1 && props.route.index !== 1) {
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
  setAndroidBackPressButton(navigator) {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.popToTop();
          return true;
      }
      return false;
    });
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
        <NavButton index={0} routes={routes} route={route} navigator={navigator} />
        <NavButton index={1} routes={routes} route={route} navigator={navigator} />
        <NavButton index={2} routes={routes} route={route} navigator={navigator} />
        <NavButton index={3} routes={routes} route={route} navigator={navigator} />
      </View>
    );
  }

  renderScene = (route, navigator) => {
    var page = this.page(route, navigator);

    if (route.index === 0) {
      var openAdmin = () => {
        navigator.replace(routes[3].scene);
      }
      openAdminState.open = openAdmin
    }
    return page;
  }

  render() {
    return (
      <Navigator
        initialRoute={routes[1]}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FloatFromBottom}
        ref={this.setAndroidBackPressButton}
      />
    );
  }
}


var styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#F5BB94',
  },
  Routing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
  },
  NavButton: {
    padding: 20,
    flex: 1,
  },
  Scene: {
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
    width: 27,
    height: 27,
  },
  iconText: {
    alignSelf: 'center'

  }
});
