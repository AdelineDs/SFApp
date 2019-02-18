//Navigation/DrawerNavigation.js

import React from 'react'
import { StyleSheet, Image, Button, View, Text } from 'react-native'
import { DrawerNavigator, createDrawerNavigator, createAppContainer, createStackNavigator, DrawerActions  } from 'react-navigation'


class DrawerScreen extends React.Component {
  render() {
    return (
      <View>
      <Button
        onPress={() => this.props.navigation.toggleDrawer()}
        title="Ouvrir le menu"
      />
      </View>
    );
  }
}

export default DrawerScreen
