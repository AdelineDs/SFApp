// Navigation/TvNavigations.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import TvShowSearch from '../Components/TvShows/TvShowSearch'
import TvShowDetail from '../Components/TvShows/TvShowDetail'
import Favorites from '../Components/Films/Favorites'
import News from '../Components/Films/News'
import FilmsSeen from '../Components/Films/FilmsSeen'
import SeasonDetail from '../Components/TvShows/SeasonDetail'
import EpisodeDetail from '../Components/TvShows/EpisodeDetail'

const TvShowSearchStackNavigator = createStackNavigator({
  TvShowSearch: {
    screen: TvShowSearch,
    navigationOptions: {
      title: 'Rechercher une série'
    }
  },
  TvShowDetail: {
    screen: TvShowDetail
  },
  SeasonDetail: {
    screen: SeasonDetail
  },
  EpisodeDetail: {
    screen: EpisodeDetail
  }
})

const TvTabNavigator = createBottomTabNavigator(
  {
    Rechercher: {
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

export default createAppContainer(TvTabNavigator)
