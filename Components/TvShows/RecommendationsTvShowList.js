// Components/SimilarFilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import RecommendationsTvShowItem from './RecommendationsTvShowItem'
import { connect } from 'react-redux'

class RecommendationsTvShowList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tvShows: []
    }
  }

  _displayDetailForTvShow = (idTvShow) => {
    console.log("Display TvShow :" + idTvShow)
    this.props.navigation.push('TvShowDetail', {idTvShow: idTvShow})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.tvShows}
          //extraData={this.props.favoritesFilm}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <RecommendationsTvShowItem
              tvShow={item}
              //isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} // Bonus pour différencier les films déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
              displayDetailForTvShow={this._displayDetailForTvShow}
            />
          )}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(RecommendationsTvShowList)
