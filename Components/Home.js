//Components/Home.js

import React from 'react';
import { Text, ScrollView, StyleSheet, Button, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import FilmList from './Films/FilmList'
import { getUpcomingFilmsFromApi } from '../API/TMDBApi'

class Home extends React.Component {

   static navigationOptions =  ({navigation}) => ({
        headerTitle: "Accueil",
        headerLeft: (
            <TouchableOpacity style={styles.menu_btn_left}
                onPress={() => {navigation.openDrawer()}}
            >
              <Image
                source={require('../Images/ic_menu.png')}
                style={styles.icon}
              />
            </TouchableOpacity>),
        headerStyle: {
          backgroundColor: '#4e708b'
        },
        headerRight: (
            <TouchableOpacity style={styles.menu_btn_right}
                onPress={() => {navigation.navigate("NowPlaying")}}
            >
              <Image
                source={require('../Images/ic_tickets.png')}
                style={styles.icon}
              />
            </TouchableOpacity>),
  })

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
  }

  _loadFilms() {
    this.setState({ isLoading: true })
    getUpcomingFilmsFromApi(this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films: [ ...this.state.films, ...data.results ],
          isLoading: false
        })
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Bientôt dans vos salles</Text>
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
        backgroundColor: '#213242'
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
      backgroundColor: '#3a576e',
      color: '#dac284'
    }
});


export default Home;
