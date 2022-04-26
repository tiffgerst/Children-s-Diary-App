import React from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { theme } from '../src/core/theme'
import TagButtonList from './TagButtonList'
import MoodIconList from './MoodIconList'
import moment from 'moment'

function Item({
  createDateTime,
  titleText,
  contentText,
  imageURL,
  tagNameAll,
  emojiUrlAll,
  postID,
  navigation
}) {
  if (tagNameAll[0]==='') {
    tagNameAll = ''
  }
  if (emojiUrlAll[0] === '') {
    emojiUrlAll = ''
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('PostFeed', {postID:postID})}>
      <View style={styles.container}>
        <Text style={styles.date}>{createDateTime}</Text>
        <Text style={styles.title}>{titleText}</Text>
        {imageURL?(<Image style={styles.image} source={{url:imageURL}}/>):(<View></View>)}
        {contentText?(
          <Text style={styles.text} numberOfLines={1}>
            {contentText}
          </Text>
        ):(<View></View>)}
        {tagNameAll?(
          <TagButtonList
            data={tagNameAll}
          />
        ):(<View></View>)}
        {emojiUrlAll?(
          <MoodIconList
            data={emojiUrlAll}
          />
        ):(<View></View>)}        
      </View>
    </TouchableOpacity>
  )
}

// the filter
function SearchBarList({ searchPhrase, setClicked, data, navigation }) {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === '') {
      return (
        <View>
          <Item
            createDateTime={moment(item.createDateTime).format('DD MMM YYYY')}
            titleText={item.titleText}
            contentText={item.contentText}
            imageURL={item.imageURL}
            tagNameAll={item.tagNameAll.split(', ')}
            emojiUrlAll={item.emojiUrlAll.split(', ')}
            postID={item.postID}
            navigation={navigation}
          />
        </View>
      )
    }
    // filter of the date
    if (
      moment(item.createDateTime).format('DD MMM YYYY')
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim())
    ) {
      return (
        <View>
          <Item
            createDateTime={moment(item.createDateTime).format('DD MMM YYYY')}
            titleText={item.titleText}
            contentText={item.contentText}
            imageURL={item.imageURL}
            tagNameAll={item.tagNameAll.split(', ')}
            emojiUrlAll={item.emojiUrlAll.split(', ')}
            postID={item.postID}
            navigation={navigation}
          />
        </View>
      )
    }
    // filter of the title
    if (
      item.titleText
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim())
    ) {
      return (
        <View>
          <Item
            createDateTime={moment(item.createDateTime).format('DD MMM YYYY')}
            titleText={item.titleText}
            contentText={item.contentText}
            imageURL={item.imageURL}
            tagNameAll={item.tagNameAll.split(', ')}
            emojiUrlAll={item.emojiUrlAll.split(', ')}
            postID={item.postID}
            navigation={navigation}
          />
        </View>
      )
    }
    // filter of the content
    if (
      item.contentText
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim())
    ) {
      return (
        <View>
          <Item
            createDateTime={moment(item.createDateTime).format('DD MMM YYYY')}
            titleText={item.titleText}
            contentText={item.contentText}
            imageURL={item.imageURL}
            tagNameAll={item.tagNameAll.split(', ')}
            emojiUrlAll={item.emojiUrlAll.split(', ')}
            postID={item.postID}
            navigation={navigation}
          />
        </View>
      )
    }
    // filter of the tag
    if (
      item.tagNameAll
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim())
    ) {
      return (
        <View>
          <Item
            createDateTime={moment(item.createDateTime).format('DD MMM YYYY')}
            titleText={item.titleText}
            contentText={item.contentText}
            imageURL={item.imageURL}
            tagNameAll={item.tagNameAll.split(', ')}
            emojiUrlAll={item.emojiUrlAll.split(', ')}
            postID={item.postID}
            navigation={navigation}
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
    paddingBottom: 8,
    borderRadius: 12,
    backgroundColor: theme.colors.tint,
    borderWidth: 3,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.25,
  },
  grid: {
    // width: '100%',
    paddingBottom: 220,
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
    paddingBottom: 10,
    top: 5,
    left: 11,
  },
  image: {
    width: '95%',
    height: 300,
    alignSelf: 'center',
    top: 2,
    borderRadius: 12,
  },
})
