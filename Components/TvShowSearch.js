// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import TvItem from './TvItem'
import TvList from './TvList'
import { getTvShowFromApiWithSearchedText } from '../API/TMDBApi'

class TvShowSearch extends React.Component {

  static navigationOptions =  ({navigation}) => ({
       headerTitle: "Rechercher une série",
       headerLeft: (
           <TouchableOpacity style={styles.menu_btn}
               onPress={() => {navigation.openDrawer()}}
           >
             <Image
               source={require('../Images/ic_menu.png')}
               style={{width: 30, height: 30}}
             />
           </TouchableOpacity>),
       headerStyle: {
         backgroundColor: 'lightgrey'
       }
 })

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      tvShows: [],
      isLoading: false
    }
    this._loadTvShows = this._loadTvShows.bind(this)
  }

  _loadTvShows() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getTvShowFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            tvShows: [ ...this.state.tvShows, ...data.results ],
            isLoading: false
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _searchTvShows() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      tvShows: [],
    }, () => {
        this._loadTvShows()
    })
  }

  _displayDetailForTvShow = (idTvShow) => {
    console.log("Display Tv show with id " + idShow)
    this.props.navigation.navigate("TvShowDetail", { idTvShow: idTvShow })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre de la série'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchTvShows()}
        />
        <Button title='Rechercher la série' onPress={() => this._searchTvShows()}/>
        <TvList
          tvShows={this.state.tvShows}
          navigation={this.props.navigation}
          loadShows={this._loadTvShows}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default TvShowSearch
