// Components/SimilarFilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CastFilmItem from './CastFilmItem'
import { connect } from 'react-redux'

class CastFilmList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cast: []
    }
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film :" + idFilm)
    this.props.navigation.push('FilmDetail', {idFilm: idFilm})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.cast}
          //extraData={this.props.favoritesFilm}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <CastFilmItem
              cast={item}
              isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} // Bonus pour différencier les films déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
              displayDetailForFilm={this._displayDetailForFilm}
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

export default connect(mapStateToProps)(CastFilmList)
