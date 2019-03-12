// Components/SimilarFilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi, getFrenchReleaseDateFromApi } from '../API/TMDBApi'
import moment from 'moment'

class CastItem extends React.Component {

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

  _displayCastImage() {
    let sourceImage = {uri: getImageFromApi(this.props.cast.profile_path)}
    if (this.props.cast.profile_path == null ) {
      sourceImage = require('../Images/ic_person.png')
    }
    return(
      <Image
        style={styles.image}
        source={sourceImage}
      />
    )
  }

  _displayCharacter(){
    if (this.props.cast.character != "") {
      return (
        <Text style={styles.text} numberOfLines={1}>({this.props.cast.character})</Text>
      )
    }
  }

  render() {
    const { cast, displayDetailForFilm } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => {}}>
        {this._displayCastImage()}
        <View style={styles.content_container}>
          <Text style={styles.title_text} numberOfLines={1}>{cast.name}</Text>
          {this._displayCharacter()}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 155,
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
    flexWrap: 'wrap',
  },
  text: {
    fontStyle: 'italic',
    fontSize: 12,
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default CastItem
