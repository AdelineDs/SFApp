// Navigation/Navigations.js

import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Films/Search'
import FilmDetail from '../Components/Films/FilmDetail'
import Favorites from '../Components/Films/Favorites'
import FilmsSeen from '../Components/Films/FilmsSeen'
import Home from '../Components/Home'
import NowPlaying from '../Components/Films/NowPlaying'
import MoviesTabNavigator from './Navigation'
import TvTabNavigator from './TvNavigation'

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
  Tv: TvTabNavigator
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
