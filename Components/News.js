// Components/News.js

import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import FilmList from './FilmList'
import { getBestFilmsFromApi } from '../API/TMDBApi'

class News extends React.Component {

  static navigationOptions =  ({navigation}) => ({
       headerTitle: "Nouveautés",
       headerLeft: (
           <TouchableOpacity style={{}}
               onPress={() => {navigation.openDrawer()}}
           >
             <Image
               source={require('../Images/ic_menu.png')}
               style={{width: 30, height: 30}}
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
    getBestFilmsFromApi(this.page+1).then(data => {
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

export default News
