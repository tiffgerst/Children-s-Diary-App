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
import moment from 'moment'

function Item({
  createDateTime,
  titleText,
  contentText,
  // journalImage,
  // journalTag,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{createDateTime}</Text>
      <Text style={styles.title}>{titleText}</Text>
      {/* <Image style={styles.image} source={journalImage} /> */}
      <Text style={styles.text} numberOfLines={1}>
        {contentText}
      </Text>
      {/* <TagButton style={styles.tag} mode="contained">
        {journalTag}
      </TagButton> */}
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
            createDateTime={moment(item.createDateTime).format('DD MMM YYYY')}
            titleText={item.titleText}
            contentText={item.contentText}
            // journalImage={item.journalImage}
            // journalTag={item.journalTag}
          />
        </View>
      )
    }
    // filter of the date
    if (
      moment(item.createDateTime).format('DD MMM YYYY')
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <View>
          <Item
            createDateTime={moment(item.createDateTime).format('DD MMM YYYY')}
            titleText={item.titleText}
            contentText={item.contentText}
            // journalImage={item.journalImage}
            // journalTag={item.journalTag}
          />
        </View>
      )
    }
    // filter of the title
    if (
      item.titleText
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <View>
          <Item
            createDateTime={moment(item.createDateTime).format('DD MMM YYYY')}
            titleText={item.titleText}
            contentText={item.contentText}
            // journalImage={item.journalImage}
            // journalTag={item.journalTag}
          />
        </View>
      )
    }
    // filter of the content
    if (
      item.contentText
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <View>
          <Item
            createDateTime={moment(item.createDateTime).format('DD MMM YYYY')}
            titleText={item.titleText}
            contentText={item.contentText}
            // journalImage={item.journalImage}
            // journalTag={item.journalTag}
          />
        </View>
      )
    }
    // // filter of the tag
    // if (
    //   item.journalTag
    //     .toUpperCase()
    //     .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    // ) {
    //   return (
    //     <View>
    //       <Item
    //         createDateTime={item.createDateTime}
    //         titleText={item.titleText}
    //         contentText={item.contentText}
    //         journalTag={item.journalTag}
    //       />
    //     </View>
    //   )
    // }
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
          keyExtractor={(item) => item.postID}
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
