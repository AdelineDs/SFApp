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

  _displayDetailForTvShow = (idTvShow) => {
    console.log("Display série :" + idTvShow)
    this.props.navigation.navigate('TvShowDetail', {idTvShow: idTvShow})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          numColumns={2}
          data={this.props.tvShows}
          extraData={this.props.favoritesTvShow}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TvItem
              show={item}
              isTvShowFavorite={(this.props.favoritesTvShow.findIndex(film => film.id === item.id) !== -1) ? true : false} // Bonus pour différencier les films déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
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
    favoritesTvShow: state.toggleFavoriteTvShow.favoritesTvShow
  }
}

export default connect(mapStateToProps)(TvList)
