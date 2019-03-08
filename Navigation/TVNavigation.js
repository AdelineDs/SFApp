// Navigation/TvNavigations.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import TvShowSearch from '../Components/TvShowSearch'
import TvShowDetail from '../Components/TvShowDetail'
import Favorites from '../Components/Favorites'
import News from '../Components/News'
import FilmsSeen from '../Components/FilmsSeen'

const TvShowSearchStackNavigator = createStackNavigator({
  TvShowSearch: {
    screen: TvShowSearch,
    navigationOptions: {
      title: 'Rechercher une série'
    }
  },
  TvShowDetail: {
    screen: TvShowDetail
  }
})

const TvTabNavigator = createBottomTabNavigator(
  {
    TvShowSearch: {
      screen: TvShowSearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_search.png')}
            style={styles.icon}/>
        }
      }
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false,
      showIcon: true
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(TvTabNavigator)
