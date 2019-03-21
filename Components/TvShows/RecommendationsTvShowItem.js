// Components/SimilarFilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../../API/TMDBApi'
import moment from 'moment'

class RecommendationsTvShowItem extends React.Component {

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

  render() {
    const { tvShow, displayDetailForTvShow } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForTvShow(tvShow.id)}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(tvShow.poster_path)}}
        />
        <View style={styles.content_container}>
          <Text style={styles.title_text} numberOfLines={1}>{tvShow.name}</Text>
          {this._displayFavoriteImage()}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 150,
    width: 120,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  image: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 90
  },
  content_container: {
    flex: 1,
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    color: '#fdd389'
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default RecommendationsTvShowItem
