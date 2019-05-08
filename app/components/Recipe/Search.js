import React, {Component} from 'react'
import { StyleSheet, Text, View, SectionList, TextInput } from 'react-native'

export class Search extends Component {
  render() {
    return(
      <View>
        <TextInput style={ styles.searchText } placeholder='Search for Recipe' onChangeText={this.props.onChange}></TextInput>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchText: {
    borderRadius: 20,
    backgroundColor: '#eee',
    height: 30,
    margin: 10,
    paddingLeft: 10
  }
})
