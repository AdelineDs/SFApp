// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform, Button } from 'react-native'
import { getActorDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'
import CreditFilmList from './Films/CreditFilmList'

class ActorDetail extends React.Component {

  static navigationOptions =  ({navigation}) => ({
       headerStyle: {
         backgroundColor: '#4e708b'
       }
 })

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      actor: undefined,
      isLoading: false,
    }
    //this._toggleFavorite = this._toggleFavorite.bind(this)
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      actor: this.state.actor
    })
  }

  componentDidMount() {
    this._isMounted = true

    // const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    // if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
    //   // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
    //   if (this._isMounted) {
    //     this.setState({
    //       film: this.props.favoritesFilm[favoriteFilmIndex]
    //     }, () => { this._updateNavigationParams() })
    //     return
    //   }
    // }
    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
    this._getActorDetail()
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

  _getActorDetail(){
    this.setState({ isLoading: true })
    getActorDetailFromApi(this.props.navigation.state.params.idActor).then(data => {
      if (this._isMounted) {
        this.setState({
          actor: data,
          isLoading: false
        }, () => { this._updateNavigationParams() })
      }
    })
  }

  // _toggleFavorite() {
  //   const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
  //   this.props.dispatch(action)
  // }
  //
  // _toggleSeen() {
  //   const action = { type: "TOGGLE_SEEN", value: this.state.film }
  //   this.props.dispatch(action)
  // }

  // _displayFavoriteImage() {
  //   var sourceImage = require('../Images/ic_heart_blue.png')
  //   var shouldEnlarge = false // Par défaut, si le film n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge à true
  //   if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
  //     sourceImage = require('../Images/ic_heart_red.png')
  //     //shouldEnlarge = true // Si le film est dans les favoris, on veut qu'au clic sur le bouton, celui-ci se rétrécisse => shouldEnlarge à false
  //   }
  //   return (
  //     <EnlargeShrink
  //       shouldEnlarge={shouldEnlarge}>
  //       <Image
  //         style={styles.favorite_image}
  //         source={sourceImage}
  //       />
  //     </EnlargeShrink>
  //   )
  // }

  _displayActor() {
    const { actor } = this.state
    if (actor != undefined) {
      console.log(this.props.navigation.state.routeName);
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(actor.profile_path)}}
          />
          <Text style={styles.title_text}>{actor.name}</Text>
          <Text style={styles.description_text}>{actor.biography}</Text>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Date de naissance :</Text>
            <Text style={styles.default_text}>{moment(new Date(actor.birthday)).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Lieu de naissance :</Text>
            <Text style={styles.default_text}>{actor.place_of_birth}</Text>
          </View>
          <Text style={styles.section_title}>Filmographie : </Text>
          <CreditFilmList
            films={actor.combined_credits.cast}
            navigation={this.props.navigation}
            page={this.page}
            totalPages={this.totalPages}
            favoriteList={false}
          />
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayActor()}
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
    height: 250,
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

export default connect(mapStateToProps)(ActorDetail)
