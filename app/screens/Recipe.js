import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native'
import WS from 'react-native-websocket'
import axios from 'axios'

export default class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      loading: true
    }
  }

  async componentDidMount() {
    const { navigation } = this.props
    const recipeId = navigation.getParam('recipeId', 0)
    try {
      const response = await axios.get(`http://localhost:3000/recipes/${recipeId}`)
      const { description } = response.data.recipe
      this.setState({ description, loading: false })
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
          <Text>{this.state.description}</Text>
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
