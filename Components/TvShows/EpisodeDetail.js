// Components/TvShowDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform, Button } from 'react-native'
import { getEpisodeDetailFromApi, getImageFromApi } from '../../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import EnlargeShrink from '../../Animations/EnlargeShrink'
import CastList from '../CastList'

class EpisodeDetail extends React.Component {

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

  _isMounted = false

  constructor(props) {
    super(props)
    this.page = 1
    this.totalPage = 1
    this.state = {
      episodes: [],
      episode: undefined,
      isLoading: false,
    }
    //this._toggleFavoriteTvShow = this._toggleFavoriteTvShow.bind(this)
    //this._shareTvShow = this._shareTvShow.bind(this)
    //this._toggleSeen = this._toggleSeen.bind(this)
  }


  _updateNavigationParams() {
    this.props.navigation.setParams({
    /*  shareTvShow: this._shareTvShow, */
      episode: this.state.episode
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

    this._getEpisodeDetail()
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

  _getEpisodeDetail(){
    this.setState({ isLoading: true })
    getEpisodeDetailFromApi(this.props.navigation.state.params.idTvShow, this.props.navigation.state.params.idSeason, this.props.navigation.state.params.idEpisode).then(data => {
      if (this._isMounted) {
        console.log(data);
        this.setState({
          episode: data,
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

  _displayEpisode() {
    const { episode } = this.state
    if (episode != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(episode.still_path)}}
          />
          <Text style={styles.title_text}>{episode.name}</Text>
          <Text style={styles.description_text}>{episode.overview}</Text>
          <Text style={styles.default_text}>Note : {episode.vote_average}</Text>
          <Text style={styles.default_text}>Nombre de votes : {episode.vote_count}</Text>
          <Text style={styles.section_title}>Casting : </Text>
          <CastList
            cast={episode.credits.cast}
            navigation={this.props.navigation}
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
        {this._displayEpisode()}
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
    marginBottom: 0,
    color: '#000000',
    textAlign: 'center'
  },
  favorite_container: {
    alignItems: 'center',
  },
  author_text: {
    textAlign: 'center',
  },
  production_text: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15,
    textAlign: 'justify'
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
    favoritesTvShow: state.toggleFavoriteTvShow.favoritesTvShow,
    //TvShowsSeen: state.toggleSeenTvShow.TvShowsSeen
  }
}

export default connect(mapStateToProps)(EpisodeDetail)
