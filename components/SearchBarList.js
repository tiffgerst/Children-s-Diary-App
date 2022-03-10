import React from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { theme } from '../src/core/theme'
import TagButton from './TagButton'

function Item({
  journalDate,
  journalTitle,
  journalText,
  journalImage,
  journalTag,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{journalDate}</Text>
      <Text style={styles.title}>{journalTitle}</Text>
      <Image style={styles.image} source={journalImage} />
      <Text style={styles.text} numberOfLines={1}>
        {journalText}
      </Text>
      <TagButton style={styles.tag} mode="contained">
        {journalTag}
      </TagButton>
      <Text style={{ paddingBottom: 10 }} />
    </View>
  )
}

// the filter
function SearchBarList({ searchPhrase, setClicked, data }) {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === '') {
      return (
        <View>
          <Item
            journalDate={item.journalDate}
            journalTitle={item.journalTitle}
            journalText={item.journalText}
            journalImage={item.journalImage}
            journalTag={item.journalTag}
          />
        </View>
      )
    }
    // filter of the date
    if (
      item.journalDate
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <View>
          <Item
            journalDate={item.journalDate}
            journalTitle={item.journalTitle}
            journalText={item.journalText}
            journalImage={item.journalImage}
            journalTag={item.journalTag}
          />
        </View>
      )
    }
    // filter of the title
    if (
      item.journalTitle
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <View>
          <Item
            journalDate={item.journalDate}
            journalTitle={item.journalTitle}
            journalText={item.journalText}
            journalImage={item.journalImage}
            journalTag={item.journalTag}
          />
        </View>
      )
    }
    // filter of the content
    if (
      item.journalText
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <View>
          <Item
            journalDate={item.journalDate}
            journalTitle={item.journalTitle}
            journalText={item.journalText}
            journalImage={item.journalImage}
            journalTag={item.journalTag}
          />
        </View>
      )
    }
    // filter of the tag
    if (
      item.journalTag
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <View>
          <Item
            journalDate={item.journalDate}
            journalTitle={item.journalTitle}
            journalText={item.journalText}
            journalTag={item.journalTag}
          />
        </View>
      )
    }
  }

  return (
    <SafeAreaView>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false)
        }}
      >
        <FlatList
          contentContainerStyle={styles.grid}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.postId}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

export default SearchBarList

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginHorizontal: 5,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: theme.colors.tint,
    borderWidth: 3,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.25,
  },
  grid: {
    width: '100%',
    paddingBottom: 300,
  },
  date: {
    fontSize: 13,
    color: '#5A6174',
    padding: 1,
    top: 8,
    right: 10,
    alignSelf: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    color: '#5A6174',
    padding: 1,
    left: 10,
  },
  text: {
    fontSize: 13,
    color: '#5A6174',
    width: '95%',
    padding: 1,
    top: 5,
    left: 10,
  },
  image: {
    width: '95%',
    alignSelf: 'center',
    top: 2,
    borderRadius: 12,
  },
  tag: {
    top: 15,
    left: 10,
  },
})
