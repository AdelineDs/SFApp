// Components/SimilarFilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import EpisodeItem from './EpisodeItem'
import { connect } from 'react-redux'

class EpisodesList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      episodes: []
    }
  }

  _displayDetailForEpisode = (idTvShow, idSeason, idEpisode) => {
    console.log("Display episode :" + idEpisode + ' display saison : ' + idSeason + ' display tvShow : ' + idTvShow)
    this.props.navigation.push('EpisodeDetail', {idTvShow: idTvShow, idSeason: idSeason, idEpisode: idEpisode})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.episodes}
          //extraData={this.props.favoritesFilm}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <EpisodeItem
              episode={item}
              idTvShow={this.props.idTvShow}
              idSeason={this.props.idSeason}
              //isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} // Bonus pour différencier les films déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
              displayDetailForEpisode={this._displayDetailForEpisode}
            />
          )}
          // onEndReachedThreshold={0.5}
          // onEndReached={() => {
          //   if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
          //     this.props.loadFilms()
          //   }
          // }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginBottom: 10
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(EpisodesList)
