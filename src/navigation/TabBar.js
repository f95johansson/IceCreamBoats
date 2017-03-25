import React, { Component } from 'react';
import { 
  View,
  Text,
  Navigator,
  TouchableHighlight,
  StyleSheet,
  BackAndroid
} from 'react-native';

function AboutTest(props) {
  return (<Text>{props.text}</Text>);
}

const routes = [
    {scene: <AboutTest text='1'/>, title: 'Om oss', index: 0},
    {scene: <AboutTest text='2'/>, title: 'Karta', index: 1},
    {scene: <AboutTest text='3'/>, title: 'Meny', index: 2},
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
      <Text>{props.routes[props.index].title}</Text>
    </TouchableHighlight>
  );
}

export default class TabBar extends Component {

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
    return (<View style={styles.app}>
              <View style={styles.Scene}>{route.scene}</View>
              <View>{this.bar(route, navigator)}</View>
            </View>);
  }

  bar = (route, navigator) => {
    return (
      <View style={styles.TabBar}>
        <NavButton index={0} routes={routes} route={route} navigator={navigator} />
        <NavButton index={1} routes={routes} route={route} navigator={navigator} />
        <NavButton index={2} routes={routes} route={route} navigator={navigator} />
      </View>
      );
  }

  render() {
    return (
      <Navigator
        initialRoute={routes[1]}
        renderScene={this.page}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FloatFromBottom}
        ref={this.setAndroidBackPressButton}
      />
    );
  }
}

/*
React.BackAndroid.addEventListener('hardwareBackPress', () => {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
});
*/

var styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  TabBar_old: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  TabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  NavButton: {
    padding: 20,
  },
  Scene: {

  }
});

