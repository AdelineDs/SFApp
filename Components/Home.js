//Components/Home.js

import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import FilmList from './FilmList'
import { getUpcomingFilmsFromApi } from '../API/TMDBApi'

class Home extends React.Component {

   static navigationOptions =  ({navigation}) => ({
        headerTitle: "Home",
        headerLeft: (
            <TouchableOpacity style={styles.menu_btn}
                onPress={() => {navigation.openDrawer()}}
            >
              <Image
                source={require('../Images/ic_menu.png')}
                style={{width: 30, height: 30 }}
              />
            </TouchableOpacity>),
        headerStyle: {
          backgroundColor: 'lightgrey'
        }
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
      <FilmList
        films={this.state.films}
        navigation={this.props.navigation}
        loadFilms={this._loadFilms}
        page={this.page}
        totalPages={this.totalPages}
        favoriteList={false}
      />
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu_btn: {
        marginLeft: 20,
    },
    icon: {
      width: 30,
      height: 30
    }
});


export default Home;
