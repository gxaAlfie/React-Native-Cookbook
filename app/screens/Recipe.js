import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native'
import axios from 'axios'

export default class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {},
      loading: true
    }
  }

  async componentDidMount() {
    const { navigation } = this.props
    const recipeId = navigation.getParam('recipeId', 0)
    try {
      const response = await axios.get(`http://localhost:3000/recipes/${recipeId}`)
      const { recipe } = response.data
      this.setState({ recipe, loading: false })
    } catch(error) {
      console.log(error)
    }
  }

  static navigationOptions = {
    title: 'Recipe',
    headerStyle: {
      backgroundColor: '#cf0000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  renderContent() {
    const { loading } = this.state

    if (loading) {
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' color='#ff0000'/>
        </View>
      )
    } else {
      return (
        <View>
          <Text>{this.state.recipe.description}</Text>
        </View>
      )
    }
  }

  render() {
    return(
      <View>
        {this.renderContent()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center'
  }
})
