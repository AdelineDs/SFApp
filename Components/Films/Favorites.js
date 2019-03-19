// Components/Favorites.js

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import Avatar from '../Avatar'

class Favorites extends React.Component {

  static navigationOptions =  ({navigation}) => ({
       headerTitle: " Mes Favoris",
       headerLeft: (
           <TouchableOpacity style={styles.menu_btn}
               onPress={() => {navigation.openDrawer()}}
           >
             <Image
               source={require('../../Images/ic_menu.png')}
               style={{width: 30, height: 30}}
             />
           </TouchableOpacity>),
       headerStyle: {
         backgroundColor: '#4e708b'
       }
 })

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar/>
        </View>
        <FilmList
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  avatar_container: {
    alignItems: 'center',
    backgroundColor: '#213242'
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)
