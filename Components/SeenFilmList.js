// Components/SeenFilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import SeenFilmItem from './SeenFilmItem'
import { connect } from 'react-redux'

class SeenFilmList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film " + idFilm)
    this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.films}
          extraData={this.props.FilmsSeen}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <SeenFilmItem
              film={item}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!this.props.FilmsSeen && this.props.page < this.props.totalPages) {
              this.props.loadFilms()
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
    FilmsSeen: state.toggleSeen.FilmsSeen
  }
}

export default connect(mapStateToProps)(SeenFilmList)
