// Components/FilmsSeen.js

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import SeenFilmList from './SeenFilmList'
import { connect } from 'react-redux'

class FilmsSeen extends React.Component {

  static navigationOptions =  ({navigation}) => ({
       headerTitle: "Mes films vus",
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
        <SeenFilmList
          films={this.props.FilmsSeen}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#213242'
  },
  avatar_container: {
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    FilmsSeen: state.toggleSeen.FilmsSeen
  }
}

export default connect(mapStateToProps)(FilmsSeen)
