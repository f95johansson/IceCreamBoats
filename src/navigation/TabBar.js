import React, { Component } from 'react';
import { 
  View,
  Text,
  Navigator,
  TouchableHighlight,
  StyleSheet
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
      onPress={() => {
        if (props.index === 1 && props.route.index !== 1) {
          props.navigator.popToTop();
          return;
        }

        if (props.route.index !== props.index) {
          props.navigator.push(props.routes[props.index]);
        }
      }}>
      <Text>{props.routes[props.index].title}</Text>
    </TouchableHighlight>
  );
}

export default class TabBar extends Component {

  page = (route, navigator) => {
    return (<View>
              <View>{route.scene}</View>
              <View>{this.bar(route, navigator)}</View>
            </View>);
  }

  bar = (route, navigator) => {
    return (
      <View>
        <NavButton routes={routes} route={route} navigator={navigator} index={0} />
        <NavButton routes={routes} route={route} navigator={navigator} index={1} />
        <NavButton routes={routes} route={route} navigator={navigator} index={2} />
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
        style={{}}
      />
    );
  }
}

var styles = StyleSheet.create({
  TabBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  NavButton: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

