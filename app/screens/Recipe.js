import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import WS from 'react-native-websocket'
import axios from 'axios'

export default class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'BANANA'
    }
  }

  emit = async () => {
    // AXIOS Sending

    try {
      const response = await axios.get('http://localhost:3000/recipes')
      console.log(response.data.recipes)
      console.log(this)
    } catch (error) {
      console.log(error)
    }

      // .then((response) => this.setState({ recipes: response.data.recipes }))
      // .catch((error) => {
      //   console.log(error)
      // })
      // .finally(() => {
      //   debugger
      //   console.log('FINALLY!')
      // })

    // Fetch API Sending
    //
    // fetch('http://localhost:3000/recipes')
    //   .then(response => response.json())
    //   .then(
    //     (data) => {
    //       console.log(data.recipes)
    //     }
    //   )
    //   .catch((error) => {
    //     console.log(error)
    //   })

    // Websocket send message to rails api
    //
    // this.ws.send(
    //   JSON.stringify({
    //     command: 'message',
    //     identifier: JSON.stringify({
    //       channel: 'RecipesChannel'
    //     }),
    //     data: JSON.stringify({
    //       action: 'speak'
    //     })
    //   })
    // )
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
        <Button title='Websocket testing' onPress={this.emit}></Button>
        <Text>{this.state.text}</Text>
      </View>
    )
  }
}
