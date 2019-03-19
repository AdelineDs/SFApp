// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { getImageFromApi, getFrenchReleaseDateFromApi } from '../../API/TMDBApi'
import FadeIn from '../../Animations/FadeIn'
import moment from 'moment'

class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../../Images/ic_heart_red.png')}
        />
      )
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props
    return (
      <FadeIn>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForFilm(film.id)}>
          <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
          </View>
          <View style={styles.content_container}>
            <Text style={styles.title_text} numberOfLines={2}>{film.title}</Text>
            {this._displayFavoriteImage()}
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    width: ((Dimensions.get('window').width)/2)-20,
    height: 280,
    margin: 10,
  },
  image_container: {

  },
  image: {
    height: 250,
    resizeMode: 'cover'
  },
  content_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    textAlign: 'left',
    color: '#dac284'
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default FilmItem
