import React, {Component} from 'react'
import { View } from 'react-native'
import { List } from '../components/Recipe/List'
import { Search } from '../components/Recipe/Search'
import axios from 'axios'

export default class Cookbook extends Component {
  static navigationOptions = {
    title: 'Recipe List',
    headerStyle: {
      backgroundColor: '#cf0000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      fullRecipeList: [],
      displayedRecipeList: []
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:3000/recipes')
      const fullRecipeList = Object.entries(response.data.recipes).map((recipes) => {
        return ({
          title: recipes[0],
          data: recipes[1]
        })
      })
      this.setState({ fullRecipeList, displayedRecipeList: fullRecipeList })
    } catch(error) {
      console.log(error)
    }
  }

  handleSearch(searchQuery) {
    const { fullRecipeList } = this.state
    let displayedRecipeList = fullRecipeList.map((mealCourse) => {
      const dupedCourse = {...mealCourse}
      dupedCourse['data'] = dupedCourse.data.filter((meal) => {
        return meal.name.toLowerCase().includes(searchQuery.toLowerCase())
      })
      return dupedCourse
    })

    if (searchQuery.length == 0) {
      displayedRecipeList = fullRecipeList
    }

    this.setState({ searchQuery, displayedRecipeList })
  }

  render() {
    return (
      <View>
        <Search onChange={this.handleSearch.bind(this)}/>
        <List displayedRecipeList={this.state.displayedRecipeList} navigation={this.props.navigation}/>
      </View>
    )
  }
}
