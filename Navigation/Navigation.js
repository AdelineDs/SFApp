// Navigation/Navigations.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Films/Search'
import FilmDetail from '../Components/Films/FilmDetail'
import Favorites from '../Components/Films/Favorites'
import FilmsSeen from '../Components/Films/FilmsSeen'
import Home from '../Components/Home'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  },
})

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const FilmsSeenStackNavigator = createStackNavigator({
  FilmsSeen: {
    screen: FilmsSeen,
    navigationOptions: {
      title: "Mes Films Vus"
    }
  },
  FilmDetail: {
    screen: FilmDetail,
  }
})

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Rechercher: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_search.png')}
            style={styles.icon}/>
        }
      }
    },
    Favoris: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_heart_red.png')}
            style={styles.icon}/>
        }
      }
    },
    Vus: {
      screen: FilmsSeenStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_check_white.png')}
            style={styles.icon}/>
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#3a576e',
      inactiveBackgroundColor: '#4e708b',
      showLabel: true,
      showIcon: true,
      labelStyle: {
        color: '#dac284'
      },
      style: {
        borderTopWidth:1,
        borderTopColor:'#dac284'
      },
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)
