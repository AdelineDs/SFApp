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
import MoviesTabNavigator from './Navigation'

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home'
    }
  }
})

const StackNavigator = createStackNavigator({
  Home: HomeStackNavigator,
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
