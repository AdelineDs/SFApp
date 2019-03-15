//Components/Home.js

import React from 'react';
import { Text, ScrollView, StyleSheet, Button, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import FilmList from './FilmList'
import { getNowPlayingFilmsFromApi } from '../../API/TMDBApi'

class NowPlaying extends React.Component {

   static navigationOptions =  ({navigation}) => ({
        headerTitle: "",
        headerLeft: (
            <TouchableOpacity style={styles.menu_btn_left}
                onPress={() => {navigation.openDrawer()}}
            >
              <Image
                source={require('../../Images/ic_menu.png')}
                style={styles.icon}
              />
            </TouchableOpacity>),
        headerStyle: {
          backgroundColor: 'lightgrey'
        },
        headerRight: (
            <TouchableOpacity style={styles.menu_btn_right}
                onPress={() => {navigation.popToTop()}}
            >
              <Image
                source={require('../../Images/ic_sablier.png')}
                style={styles.icon}
              />
            </TouchableOpacity>),
  })

  _isMounted = false


  constructor(props) {
    super(props)
    this.page = 0
    this.totalPages = 0
    this.state = {
      films: [],
      isLoading: false
    }
    this._loadFilms = this._loadFilms.bind(this)
  }

  componentDidMount() {
    this._loadFilms()
    this._isMounted = true

  }

  componentWillUnmount() {
   this._isMounted = false;
 }

  _loadFilms() {
    this.setState({ isLoading: true })
    getNowPlayingFilmsFromApi(this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        if (this._isMounted) {
          this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading: false
          })
        }
    })
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.title}>Actuellement dans vos salles</Text>
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu_btn_left: {
        marginLeft: 15,
    },
    menu_btn_right: {
        marginRight: 15,
    },
    icon: {
      width: 30,
      height: 30
    },
    title:{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      padding: 15,
      backgroundColor: '#97b6a0',
      color: '#4d4049'
    }
});


export default NowPlaying;
