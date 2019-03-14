// Components/SimilarFilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi, getFrenchReleaseDateFromApi } from '../API/TMDBApi'
import moment from 'moment'

class SeasonItem extends React.Component {

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

  _displayImage() {
    let sourceImage = {uri: getImageFromApi(this.props.season.poster_path)}
    if (this.props.season.poster_path == null ) {
      sourceImage = require('../Images/ic_person.png')
    }
    return(
      <Image
        style={styles.image}
        source={sourceImage}
      />
    )
  }

  render() {
    const { season, displayDetailForFilm } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => {}}>
        {this._displayImage()}
        <View style={styles.content_container}>
          <Text style={styles.title_text} numberOfLines={1}>{season.name}</Text>
          <Text style={styles.text} numberOfLines={1}>{season.episode_count} épisodes</Text>
          <TouchableOpacity>
            <Image style={styles.favorite_image} source={require('../Images/ic_share.png')}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: "lavender",
    borderRadius: 10,
  },
  image: {
    height: 120,
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  content_container: {
    flex: 1,
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
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default SeasonItem
