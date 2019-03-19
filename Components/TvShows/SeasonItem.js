// Components/SimilarFilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { getImageFromApi, getFrenchReleaseDateFromApi } from '../../API/TMDBApi'
import moment from 'moment'

class SeasonItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../../Images/ic_favorite.png')}
        />
      )
    }
  }

  _displayImage() {
    let sourceImage = {uri: getImageFromApi(this.props.season.poster_path)}
    if (this.props.season.poster_path == null ) {
      sourceImage = require('../../Images/ic_image2.png')
    }
    return(
      <Image
        style={styles.image}
        source={sourceImage}
      />
    )
  }

  render() {
    const { season, displayDetailForSeason, idTvShow } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => {displayDetailForSeason(idTvShow, season.season_number)}}>
        {this._displayImage()}
        <View style={styles.content_container}>
          <Text style={styles.title_text} numberOfLines={1}>{season.name}</Text>
          <Text style={styles.text} numberOfLines={1}>{season.episode_count} épisodes</Text>
          <TouchableOpacity>
            <Image style={styles.check_image} source={require('../../Images/ic_check_white.png')}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    width: ((Dimensions.get('window').width)/3)-4,
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    backgroundColor: "lavender",
    borderRadius: 10,
  },
  image: {
    resizeMode: 'cover',
    height: 120,
    width: ((Dimensions.get('window').width)/3)-4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content_container: {
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 14,
    flexWrap: 'wrap',
  },
  text: {
    fontStyle: 'italic',
    fontSize: 12,
  },
  favorite_image: {
    width: 22,
    height: 22,
    marginRight: 5
  },
  check_image:{
    width: 35,
    height: 35
  }
})

export default SeasonItem
