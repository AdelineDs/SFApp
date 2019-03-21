// Components/SimilarFilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi} from '../../API/TMDBApi'
import moment from 'moment'

class EpisodeItem extends React.Component {

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
    let sourceImage = {uri: getImageFromApi(this.props.episode.still_path)}
    if (this.props.episode.still_path == null ) {
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
    const { episode, displayDetailForEpisode, idTvShow, idSeason } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => {displayDetailForEpisode(idTvShow, idSeason, episode.episode_number)}}>
        {this._displayImage()}
        <View style={styles.content_container}>
          <Text style={styles.title_text} numberOfLines={1}>{episode.name}</Text>
          <Text style={styles.text} numberOfLines={2}>{episode.overview}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 8,
    backgroundColor: '#3a576e',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dac284',
  },
  image: {
    height: 98,
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
    color: '#e3a92b'
  },
  text: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#dac284'
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  check_image:{
    width: 35,
    height: 35
  }
})

export default EpisodeItem
