// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'
import moment from 'moment'

class SeenFilmItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      longPress: false
    }
  }

  _longPressAction(){
    if (this.state.longPress === false) {
      this.setState({ longPress: true })
    }else{
      this.setState({ longPress: false })
    }
  }

  _displayInfo(film){
    if (this.state.longPress === true) {
      return(
        <View style={styles.content_container}>
          <Text style={styles.title_text}>Sorti le : {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
        </View>
      )
    }
    return(
      <View style={styles.content_container}>
        <Text style={styles.title_text}>{film.title}</Text>
      </View>
    )
  }

  render() {
    const { film, displayDetailForFilm } = this.props
    return (
      <FadeIn>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForFilm(film.id)}
          onLongPress={() => this._longPressAction()}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
          {this._displayInfo(film)}
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 100,
    flexDirection: 'row'
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
    justifyContent: 'center',
  },
  title_text: {
    fontSize: 17,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default SeenFilmItem
