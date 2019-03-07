// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform, Button } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi, getFrenchReleaseDateFromApi, getSimilarFilmsFilmsFromApi, getFilmCreditsFromAPI } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'
import SimilarFilmList from './SimilarFilmList'
import CastFilmList from './CastFilmList'

class FilmDetail extends React.Component {

  // static navigationOptions = ({ navigation }) => {
  //     const { params } = navigation.state
  //     if (params.film != undefined && Platform.OS === 'ios') {
  //       return {
  //           headerRight: <TouchableOpacity
  //                           style={styles.share_touchable_headerrightbutton}
  //                           onPress={() => params.shareFilm()}>
  //                           <Image
  //                             style={styles.share_image}
  //                             source={require('../Images/ic_share.png')} />
  //                         </TouchableOpacity>
  //       }
  //     }
  // }

  _isMounted = false

  constructor(props) {
    super(props)
    this.frenchFormat = ""
    this.page = 1
    this.totalPage = 1
    this.state = {
      films: [],
      film: undefined,
      isLoading: false,
      cast: []
    }
    this._toggleFavorite = this._toggleFavorite.bind(this)
    //this._shareFilm = this._shareFilm.bind(this)
    this._toggleSeen = this._toggleSeen.bind(this)
    this._getSimilarFilms = this._getSimilarFilms.bind(this)
  }


  _updateNavigationParams() {
    this.props.navigation.setParams({
    /*  shareFilm: this._shareFilm, */
      film: this.state.film
    })
  }

  componentDidMount() {
    this._isMounted = true
    this._getSimilarFilms()
    this._getFilmCredits()

    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) {
      if (this._isMounted) {
        this.setState({
          film: this.props.favoritesFilm[favoriteFilmIndex]
        }, () => { this._updateNavigationParams() })
        return
      }
    }

    this._getFilmDetail()
  }

  componentWillUnmount() {
   this._isMounted = false;
 }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _getFilmDetail(){
    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      if (this._isMounted) {
        this.setState({
          film: data
        }, () => { this._updateNavigationParams() })
      }
    })
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
    this.props.dispatch(action)
  }

  _toggleSeen() {
    const action = { type: "TOGGLE_SEEN", value: this.state.film }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    var sourceImage = require('../Images/ic_favorite_border.png')
    var shouldEnlarge = false // Par défaut, si le film n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge à true
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      sourceImage = require('../Images/ic_favorite.png')
      //shouldEnlarge = true // Si le film est dans les favoris, on veut qu'au clic sur le bouton, celui-ci se rétrécisse => shouldEnlarge à false
    }
    return (
      <EnlargeShrink
        shouldEnlarge={shouldEnlarge}>
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      </EnlargeShrink>
    )
  }

  _SeenButton() {
    const { film } = this.state
      if (film != undefined) {
        if (this.props.FilmsSeen.findIndex(item => item.id === this.state.film.id) !== -1) {
          return (
          <View style={styles.seenButton}>
            <Button title='NON VU' onPress={() => this._toggleSeen()}/>
          </View>)
        }
        return (
        <View style={styles.seenButton}>
          <Button title='Marquer comme vu' onPress={() => this._toggleSeen()}/>
        </View>)
      }
    }

  _getFrenchDate() {
    const { film } = this.state
    if (film != undefined) {
      getFrenchReleaseDateFromApi(film.id).then(data => {
          for(let key in data.results){
            if (data.results[key].iso_3166_1 === "FR") {
               let frenchDate = data.results[key].release_dates[0].release_date
               this.frenchFormat = moment(new Date(frenchDate)).format('DD/MM/YYYY')
               if (this._isMounted) {
                 this.setState({ isLoading: false })
               }
            }
          }
      })
    }
  }

  _getSimilarFilms(){
    getSimilarFilmsFilmsFromApi(this.props.navigation.state.params.idFilm).then(data => {
      //console.log('get similars' + data.results);
      if (this._isMounted) {
        this.setState({
          films: [ ...this.state.films, ...data.results ]
        })
      }
    })
  }

  _getFilmCredits(){
    getFilmCreditsFromAPI(this.props.navigation.state.params.idFilm).then(data => {
      //console.log('get film credits' + data.cast);
      if (this._isMounted) {
        this.setState({
          cast: [ ...this.state.cast, ...data.cast ]
        })
      }
    }
    )
  }

  _displayFilmCast(){
    console.log(this.state.cast.length);
    if (this.state.cast.length != 0 ) {
      return (
        <View>
          <Text style={styles.section_title}>Casting du film : </Text>
          <CastFilmList
            cast={this.state.cast}
            navigation={this.props.navigation}
            //loadFilms={this._getSimilarFilms}
            favoriteList={false}
          />
        </View>
      )
    }
  }

  _displaySimilarFilms(){
    if (this.state.films.length != 0 ) {
      return (
        <View>
          <Text style={styles.section_title}>Selection de films similaires : </Text>
          <SimilarFilmList
            films={this.state.films}
            navigation={this.props.navigation}
            loadFilms={this._getSimilarFilms}
            page={this.page}
            totalPages={this.totalPages}
            favoriteList={false}
          />
        </View>
      )
    }
  }

  _displayFilm() {
    const { film } = this.state
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sortie en France : le {this.frenchFormat}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
          {this._displayFilmCast()}
          {this._displaySimilarFilms()}
        </ScrollView>
      )
    }
  }

/* -----------------------
  _shareFilm() {
    const { film } = this.state
    Share.share({ title: film.title, message: film.overview })
  }

  _displayFloatingActionButton() {
    const { film } = this.state
    if (film != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.png')} />
        </TouchableOpacity>
      )
    }
  }
  ------------------------------ */

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._getFrenchDate()}
        {this._displayFilm()}
        {this._SeenButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  section_title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    color: '#ab2635'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  favorite_container: {
    alignItems: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_image:{
    flex: 1,
    width: null,
    height: null
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  share_image: {
    width: 30,
    height: 30
  },
  seenButton: {
    zIndex: 1
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    FilmsSeen: state.toggleSeen.FilmsSeen
  }
}

export default connect(mapStateToProps)(FilmDetail)
