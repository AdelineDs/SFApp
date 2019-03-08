// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import TvItem from './TvItem'
import { connect } from 'react-redux'

class TvList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tvShows: []
    }
  }

  _displayDetailForTvShow = (idShow) => {
    console.log("Display film :" + idShow)
    this.props.navigation.navigate('TvDetail', {idFilm: idShow})
  }

  render() {
    console.log('id' + this.state.tvShows.length);
    return (
        <FlatList
          style={styles.list}
          data={this.props.tvShows}
          //extraData={this.props.favoritesFilm}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TvItem
              show={item}
              //isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} // Bonus pour différencier les films déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
              displayDetailForTvShow={this._displayDetailForTvShow}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
              this.props.loadShows()
            }
          }}
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

export default connect(mapStateToProps)(TvList)
