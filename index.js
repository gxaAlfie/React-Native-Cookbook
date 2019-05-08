import {AppRegistry} from 'react-native'
import Cookbook from './app/screens/Cookbook'
import Recipe from './app/screens/Recipe'
import {name as appName} from './app.json'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const MainNavigator = createStackNavigator(
  {
    Home: Cookbook,
    Recipe: Recipe
  },
  {
    initialRouteName: 'Home'
  }
)

const MainApp = createAppContainer(MainNavigator)

AppRegistry.registerComponent(appName, () => MainApp)
