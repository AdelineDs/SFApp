// Components/SimilarFilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import SeasonItem from './SeasonItem'
import { connect } from 'react-redux'

class SeasonsList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      seasons: []
    }
  }

  _displayDetailForSeason = (idTvShow, idSeason) => {
    this.props.navigation.push('SeasonDetail', {idTvShow: idTvShow, idSeason: idSeason})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.seasons}
          //extraData={this.props.idTvShow}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <SeasonItem
              season={item}
              //isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} // Bonus pour différencier les films déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
              displayDetailForSeason={this._displayDetailForSeason}
              idTvShow={this.props.idTvShow}
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
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(SeasonsList)
