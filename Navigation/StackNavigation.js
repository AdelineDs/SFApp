// Navigation/Navigations.js

import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import News from '../Components/News'
import FilmsSeen from '../Components/FilmsSeen'
import Home from '../Components/Home'
import NowPlaying from '../Components/NowPlaying'
import MoviesTabNavigator from './Navigation'

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
  }
})

const NowPlayingStackNavigator = createStackNavigator({
  Home: {
    screen: NowPlaying,
    navigationOptions: {
      title: 'NowPlaying'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
  }
})

const StackNavigator = createStackNavigator({
  Home: HomeStackNavigator,
  NowPlaying: NowPlayingStackNavigator,
  Films: MoviesTabNavigator,
},
{
    headerMode: 'none',
    initialRouteName:'Home',
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: 'lightgrey',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontStyle: 'italic',
        },
    }
})

export default createAppContainer(StackNavigator)
