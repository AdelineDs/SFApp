// Components/SimilarFilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi, getFrenchReleaseDateFromApi } from '../API/TMDBApi'
import moment from 'moment'

class CastFilmItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }

  render() {
    const { cast, displayDetailForFilm } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => {}}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(cast.profile_path)}}
        />
        <View style={styles.content_container}>
          <Text style={styles.title_text} numberOfLines={1}>{cast.name}</Text>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 180,
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
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default CastFilmItem
