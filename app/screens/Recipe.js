import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import WS from 'react-native-websocket'

export default class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'BANANA'
    }
  }

  emit() {
    this.ws.send(
      JSON.stringify({
        command: 'message',
        identifier: JSON.stringify({
          channel: 'RecipesChannel'
        }),
        data: JSON.stringify({
          action: 'speak'
        })
      })
    )
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
        <WS
          ref={ref => {this.ws = ref}}
          url='ws://localhost:3000/cable'
          onOpen={() => {
            this.ws.send(
              JSON.stringify({
                command: 'subscribe',
                identifier: JSON.stringify({
                  channel: 'RecipesChannel'
                })
              })
            )
          }}
          onMessage={(e) => {
            let msg = JSON.parse(e.data)
            if (msg.type === 'ping' || msg.type === 'confirm_subscription' || msg.type === 'welcome') {
              return
            }
            const parsedData = JSON.parse(e.data)
            console.log(parsedData.message.message)
            const recipe_names = parsedData.message.data.map((recipe) => recipe.name)
            this.setState({text: recipe_names.join(', ')})
          }}
          onError={console.log}
          onClose={console.log}
          reconnect/>
        <Button title='Websocket testing' onPress={() => { this.emit() } }></Button>
        <Text>{this.state.text}</Text>
      </View>
    )
  }
}
