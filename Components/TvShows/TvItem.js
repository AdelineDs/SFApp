// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { getImageFromApi, getFrenchReleaseDateFromApi } from '../../API/TMDBApi'
import FadeIn from '../../Animations/FadeIn'
import moment from 'moment'

class TvItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isTvShowFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../../Images/ic_heart_red.png')}
        />
      )
    }
  }

  _displayImage() {
    let sourceImage = {uri: getImageFromApi(this.props.show.poster_path)}
    if (this.props.show.poster_path == null ) {
      sourceImage = require('../../Images/ic_tag_faces.png')
    }
    return(
      <Image
        style={styles.image}
        source={sourceImage}
      />
    )
  }

  render() {
    const { show, displayDetailForTvShow } = this.props
    return (
      <FadeIn>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForTvShow(show.id)}>
          {this._displayImage()}
          <View style={styles.content_container}>
              <Text style={styles.title_text} numberOfLines={2}>{show.name}</Text>
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

export default TvItem
