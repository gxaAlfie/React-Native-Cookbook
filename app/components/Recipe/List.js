import React, {Component} from 'react'
import { StyleSheet, Text, ScrollView, SectionList } from 'react-native'
import { ListItem } from 'react-native-elements'

export class List extends Component {
  handleCheckRecipe(recipeId) {
    this.props.navigation.navigate('Recipe', {
      recipeId
    })
  }

  render() {
    return(
      <ScrollView style={ styles.container }>
        <SectionList
          sections={ this.props.displayedRecipeList }
          renderItem={ ({item}) => <ListItem title={item.name} titleStyle={ styles.listItemTitle } containerStyle={ styles.listItemContainer } rightIcon={{ name: 'chevron-right' }} button onPress={() => { this.handleCheckRecipe(item.id) }}/> }
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text> }
          keyExtractor={ (item, index) => index }
          >
        </SectionList>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: '#eee',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },

  listItemTitle: {
    fontSize: 15,
  },

  listItemContainer: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  }
})
