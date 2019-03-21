// Components/TvShowDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform, Button } from 'react-native'
import { getTvShowDetailFromApi, getImageFromApi } from '../../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import EnlargeShrink from '../../Animations/EnlargeShrink'
import RecommendationsTvShowList from './RecommendationsTvShowList'
import CastList from '../CastList'
import SeasonsList from './SeasonsList'

class TvShowDetail extends React.Component {

  // static navigationOptions = ({ navigation }) => {
  //     const { params } = navigation.state
  //     if (params.tvShow != undefined && Platform.OS === 'ios') {
  //       return {
  //           headerRight: <TouchableOpacity
  //                           style={styles.share_touchable_headerrightbutton}
  //                           onPress={() => params.shareTvShow()}>
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
      tvShows: [],
      tvShow: undefined,
      isLoading: false,
    }
    this._toggleFavoriteTvShow = this._toggleFavoriteTvShow.bind(this)
    //this._shareTvShow = this._shareTvShow.bind(this)
    this._toggleSeen = this._toggleSeen.bind(this)
  }


  _updateNavigationParams() {
    this.props.navigation.setParams({
    /*  shareTvShow: this._shareTvShow, */
      tvShow: this.state.tvShow
    })
  }

  componentDidMount() {
    this._isMounted = true

    // const favoriteTvShowIndex = this.props.favoritesTvShow.findIndex(item => item.id === this.props.navigation.state.params.idTvShow)
    // if (favoriteTvShowIndex !== -1) {
    //   if (this._isMounted) {
    //     this.setState({
    //       tvShow: this.props.favoritesTvShow[favoriteTvShowIndex]
    //     }, () => { this._updateNavigationParams() })
    //     return
    //   }
    // }

    this._getTvShowDetail()
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

  _getTvShowDetail(){
    this.setState({ isLoading: true })
    getTvShowDetailFromApi(this.props.navigation.state.params.idTvShow).then(data => {
      if (this._isMounted) {
        this.setState({
          tvShow: data,
          isLoading: false
        }, () => { this._updateNavigationParams() })
      }
    })
  }

  _toggleFavoriteTvShow() {
    const action = { type: "TOGGLE_FAVORITE_TVSHOW", value: this.state.tvShow }
    this.props.dispatch(action)
  }

  _toggleSeen() {
    const action = { type: "TOGGLE_SEEN", value: this.state.tvShow }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    var sourceImage = require('../../Images/ic_heart_white.png')
    var shouldEnlarge = false // Par défaut, si le tvShow n'est pas en favoris, on veut qu'au clic sur le bouton, celui-ci s'agrandisse => shouldEnlarge à true
    if (this.props.favoritesTvShow.findIndex(item => item.id === this.state.tvShow.id) !== -1) {
      sourceImage = require('../../Images/ic_heart_red.png')
      //shouldEnlarge = true // Si le tvShow est dans les favoris, on veut qu'au clic sur le bouton, celui-ci se rétrécisse => shouldEnlarge à false
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

  // _SeenButton() {
  //   const { tvShow } = this.state
  //     if (tvShow != undefined) {
  //       if (this.props.TvShowsSeen.findIndex(item => item.id === this.state.tvShow.id) !== -1) {
  //         return (
  //         <View style={styles.seenButton}>
  //           <Button title='NON VU' onPress={() => this._toggleSeen()}/>
  //         </View>)
  //       }
  //       return (
  //       <View style={styles.seenButton}>
  //         <Button title='Marquer comme vu' onPress={() => this._toggleSeen()}/>
  //       </View>)
  //     }
  //   }

  _displayTvShowStatus(){
    if (this.state.tvShow.in_production == true) {
      return(
        <Text style={styles.production_text}>(Toujours en production)</Text>
      )
    }
  }

  _displayTvShow() {
    const { tvShow } = this.state
    if (tvShow != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(tvShow.backdrop_path)}}
          />
          <Text style={styles.title_text}>{tvShow.name}</Text>
          <Text style={styles.author_text}>Série crée par {tvShow.created_by.map(function(create){
            return create.name;
          })}</Text>
          {this._displayTvShowStatus()}
          <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => this._toggleFavoriteTvShow()}>
              {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{tvShow.overview}</Text>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Nombre de saisons :</Text>
            <Text style={styles.default_text}>{tvShow.number_of_seasons}</Text>
          </View>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Nombre d'épisodes :</Text>
            <Text style={styles.default_text}>{tvShow.number_of_episodes}</Text>
          </View>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Note :</Text>
            <Text style={styles.default_text}>{tvShow.vote_average}</Text>
          </View>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Nombre de votes :</Text>
            <Text style={styles.default_text}>{tvShow.vote_count}</Text>
          </View>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Genre(s) :</Text>
            <Text style={styles.default_text}>{tvShow.genres.map(function(genre){
                return genre.name;
              }).join(" / ")}</Text>
          </View>
          <View style={styles.info_container}>
            <Text style={styles.em_text}>Companie(s) :</Text>
            <Text style={styles.default_text}>{tvShow.production_companies.map(function(company){
                return company.name;
              }).join(" / ")}</Text>
          </View>
          <Text style={styles.section_title}>Saisons : </Text>
          <SeasonsList
            seasons={tvShow.seasons}
            idTvShow={tvShow.id}
            navigation={this.props.navigation}
            favoriteList={false}
          />
          <Text style={styles.section_title}>Casting : </Text>
          <CastList
            cast={tvShow.credits.cast}
            navigation={this.props.navigation}
            favoriteList={false}
          />
          <Text style={styles.section_title}>Recommendations : </Text>
          <RecommendationsTvShowList
            tvShows={tvShow.similar.results}
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
  _shareTvShow() {
    const { tvShow } = this.state
    Share.share({ title: tvShow.title, message: tvShow.overview })
  }

  _displayFloatingActionButton() {
    const { tvShow } = this.state
    if (tvShow != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareTvShow()}>
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
        {this._displayTvShow()}
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
  author_text: {
    textAlign: 'center',
    color: '#fdd389',
  },
  production_text: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#fdd389',
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
    favoritesTvShow: state.toggleFavoriteTvShow.favoritesTvShow,
    //TvShowsSeen: state.toggleSeenTvShow.TvShowsSeen
  }
}

export default connect(mapStateToProps)(TvShowDetail)
