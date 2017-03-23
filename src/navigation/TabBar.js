import React, { Component } from 'react';
import { View, Text, Navigator, TouchableHighlight } from 'react-native';

function AboutTest(props) {
  return (<Text>{props.text}</Text>);
}

const routes = [
    {scene: <AboutTest text='1'/>,title: 'Om oss', index: 0},
    {scene: <AboutTest text='2'/>, title: 'Karta', index: 1},
    {scene: <AboutTest text='3'/>, title: 'Meny', index: 2},
  ];

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
        <TouchableHighlight onPress={() => {
            if (route.index !== 0) {
              navigator.push(routes[0]);
            }
          }}>
          <Text>{routes[0].title}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
            if (route.index !== 1) {
              navigator.popToTop();
            }
          }}>
          <Text>{routes[1].title}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
            if (route.index !== 2) {
              navigator.push(routes[2]);
            }
          }}>
          <Text>{routes[2].title}</Text>
        </TouchableHighlight>
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
