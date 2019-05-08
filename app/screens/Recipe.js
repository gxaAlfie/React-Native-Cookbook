import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

export default class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'BANANA'
    }
    this.socket = new WebSocket('ws://localhost:3000/cable')
  }

  emit() {
    this.socket.send(
      JSON.stringify(
        {
          command: 'message',
          identifier: JSON.stringify({
            channel: 'RecipesChannel'
          }),
          data: JSON.stringify({
            action: 'speak'
          })
        }
      )
    )
  }

  componentDidMount() {
    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: JSON.stringify({
            channel: 'RecipesChannel'
          })
        })
      )
    }

    this.socket.onmessage = (e) => {
      let msg = JSON.parse(e.data)
      if (msg.type === 'ping' || msg.type === 'confirm_subscription' || msg.type === 'welcome') {
        return
      }
      const parsedData = JSON.parse(e.data)
      console.log(parsedData.message.message)
      const recipe_names = parsedData.message.data.map((recipe) => recipe.name)
      this.setState({text: recipe_names.join(', ')})
    }

    this.socket.onerror = (e) => {
      console.log('ERROR')
      console.log(e)
    }

    this.socket.onclose = (e) => {
      console.log('CLOSED!')
      console.log(e)
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

  render() {
    return(
      <View>
        <Button title='Websocket testing' onPress={() => { this.emit() } }></Button>
        <Text>{this.state.text}</Text>
      </View>
    )
  }
}
