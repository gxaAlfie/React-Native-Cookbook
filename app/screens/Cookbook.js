import React, {Component} from 'react'
import { View } from 'react-native'
import { List } from '../components/Recipe/List'
import { Search } from '../components/Recipe/Search'

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

  componentDidMount() {
    const fullRecipeList = [
      { title: 'Appetizers', data: [{id: 1, name: 'Mozzarella Sticks'}, {id: 2, name: 'French Fries'}, {id: 3, name: 'Breadsticks'}, {id: 4, name: 'Chicken Kebabs'}, {id: 5, name: 'Lamb Kebabs'}] },
      { title: 'Main Course', data: [{id: 6, name: 'Steak'}, {id: 7, name: 'Spareribs'}, {id: 8, name: 'Southern Fried Chicken'}, {id: 9, name: 'Gravlax'}] },
      { title: 'Dessert', data: [{id: 10, name: 'Banana Sundae'}, {id: 11, name: 'Strawberry Sunday'}, {id: 12, name: 'Tiramisu'}] }
    ]

    this.setState({ fullRecipeList, displayedRecipeList: fullRecipeList })
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
