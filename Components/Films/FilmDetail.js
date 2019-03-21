// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform, Button } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import EnlargeShrink from '../../Animations/EnlargeShrink'
import RecommendationsFilmList from './RecommendationsFilmList'
import CastList from '../CastList'

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
  static navigationOptions =  ({navigation}) => ({
       headerStyle: {
         backgroundColor: '#4e708b'
       }
 })

  _isMounted = false

  constructor(props) {
    super(props)
    this.page = 1
    this.totalPage = 1
    this.state = {
      films: [],
      film: undefined,
      isLoading: false,
    }
    this._toggleFavorite = this._toggleFavorite.bind(this)
    //this._shareFilm = this._shareFilm.bind(this)
    this._toggleSeen = this._toggleSeen.bind(this)
  }


  _updateNavigationParams() {
    this.props.navigation.setParams({
    /*  shareFilm: this._shareFilm, */
      film: this.state.film
    })
  }

  componentDidMount() {
    this._isMounted = true

    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
      // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
      if (this._isMounted) {
        this.setState({
          film: this.props.favoritesFilm[favoriteFilmIndex]
        }, () => { this._updateNavigationParams() })
        return
      }
    }
    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
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
          film: data,
          isLoading: false
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
    var sourceImage = require('../../Images/ic_heart_blue.png')
    var shouldEnlarge = false // Par défaut, si le film n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge à true
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      sourceImage = require('../../Images/ic_heart_red.png')
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

  _displayFrenchReleaseDate(){
    let frenchDate = "NC"
    this.state.film.release_dates.results.map(function(result){
      if (result.iso_3166_1 == "FR") {
        let date = result.release_dates[0].release_date
        frenchDate = moment(new Date(date)).format('DD/MM/YYYY')
      }
    })
    return (
      <View style={styles.info_container}>
        <Text style={styles.em_text}>Sortie en France : </Text>
        <Text style={styles.default_text}>{frenchDate}</Text>
      </View>
    )}

  _SeenButton() {
    const { film } = this.state
      if (film != undefined) {
        if (this.props.FilmsSeen.findIndex(item => item.id === this.state.film.id) !== -1) {
          return (
          <View style={styles.seenButton}>
            <Button
              title='NON VU'
              color='#4e708b'
              onPress={() => this._toggleSeen()}/>
          </View>)
        }
        return (
        <View style={styles.seenButton}>
          <Button
            title='Marquer comme vu'
            color='#4e708b'
            onPress={() => this._toggleSeen()}/>
        </View>)
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
          {this._displayFrenchReleaseDate()}
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Note :</Text>
            <Text style={styles.default_text}>{film.vote_average} / 10</Text>
          </View>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Nombre de votes :</Text>
            <Text style={styles.default_text}>{film.vote_count}</Text>
          </View>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Budget :</Text>
            <Text style={styles.default_text}>{numeral(film.budget).format('0,0[.]00 $')}</Text>
          </View>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Genre(s) :</Text>
            <Text style={styles.default_text}>{film.genres.map(function(genre){
                return genre.name;
              }).join(" / ")}</Text>
          </View>
          <View style={[styles.info_container, {marginBottom: 20}]}>
            <Text style={styles.em_text}>Companie(s) :</Text>
            <Text style={styles.default_text}>{film.production_companies.map(function(company){
                return company.name;
              }).join(" / ")}</Text>
          </View>
          <Text style={styles.section_title}>Casting du film : </Text>
          <CastList
            cast={film.credits.cast}
            navigation={this.props.navigation}
            favoriteList={false}
          />
          <Text style={styles.section_title}>Recommendations : </Text>
          <RecommendationsFilmList
            films={film.recommendations.results}
            navigation={this.props.navigation}
            page={this.page}
            totalPages={this.totalPages}
            favoriteList={false}
          />
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
        {this._displayFilm()}
        {this._SeenButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#213242'
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
    height: 180,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 28,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    color: '#e3a92b',
    textAlign: 'center'
  },
  favorite_container: {
    alignItems: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#dac284',
    margin: 5,
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'justify'
  },
  info_container:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  em_text: {
    color: '#fdd389',
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5,
  },
  default_text: {
    color: '#dac284',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_image:{
    flex: 1,
    width: null,
    height: null
  },
  section_title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    color: '#c79503',
    //textDecorationLine: 'underline'
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
    zIndex: 1,
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    FilmsSeen: state.toggleSeen.FilmsSeen
  }
}

export default connect(mapStateToProps)(FilmDetail)
