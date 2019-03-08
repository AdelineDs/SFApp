// Navigation/Navigations.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import TVSearch from '../Components/TVSearch'
import TVDetail from '../Components/TVDetail'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import News from '../Components/News'
import FilmsSeen from '../Components/FilmsSeen'
import Home from '../Components/Home'

const TVSearchStackNavigator = createStackNavigator({
  TVSearch: {
    screen: TVSearch,
    navigationOptions: {
      title: 'Rechercher une série'
    }
  }
})

const TVTabNavigator = createBottomTabNavigator(
  {
    TVSearch: {
      screen: TVSearchStackNavigator,
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

export default createAppContainer(TVTabNavigator)
