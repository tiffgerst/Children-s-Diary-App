import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import BackButton from '../components/BackButton'
import moment from 'moment'
import TagButtonList from '../components/TagButtonList'

export default function PostFeed({ route, navigation }) {
  const [backgroundURL, setBackgroundURL] = useState('')
  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  let [tag, setTag] = useState('')
  const [imageURL, setImageURL] = useState('')
  const { postID } = route.params

  // get post data from api
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        `https://mirradiaryapp.azurewebsites.net/post/` + postID
      )
      const data = await apiResponse.json()
      let backgroundURL = await data[0].backgroundURL
      let date = await data[0].createDateTime
      let title = await data[0].titleText
      let content = await data[0].contentText
      let tag = await data[0].tagNameAll.split(', ')
      let imageURL = await data[0].imageURL
      setBackgroundURL(backgroundURL)
      setDate(moment(date).format('ddd, DD MMM YYYY HH:MM'))
      setTitle(title)
      setContent(content)
      setTag(tag)
      setImageURL(imageURL)
    }
    getData()
  }, [])

  if (tag[0] === '') {
    tag = ''
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ url: backgroundURL }}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.row}>
          <BackButton
            goBack={navigation.goBack}
            style={{ position: 'relative' }}
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => console.log('pressed')}
          >
            <Text style={styles.buttonFont}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => console.log('pressed')}
          >
            <Text style={styles.buttonFont}>Remove</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.postTitle}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        {tag ? (
          <View style={styles.postTag}>
            <TagButtonList style={styles.tag} data={tag} />
          </View>
        ) : (
          <View style={{ padding: 10 }} />
        )}
        <View style={styles.postContent}>
          <ScrollView>
            <Text style={styles.content}>{content}</Text>
            {imageURL ? (
              <Image style={styles.image} source={{ url: imageURL }} />
            ) : (
              <View />
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    width: '102%',
    height: '103%',
    overflow: 'visible',
    alignSelf: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  editButton: {
    height: 36,
    width: 82,
    backgroundColor: '#7AC9A1',
    borderRadius: 6,
    top: -8,
    left: -8,
    margin: 5,
  },
  removeButton: {
    height: 36,
    width: 82,
    backgroundColor: '#FD909A',
    borderRadius: 6,
    top: -8,
    left: -8,
    margin: 5,
  },
  buttonFont: {
    color: 'white',
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 8,
    fontWeight: 'bold',
  },
  postTitle: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  postTag: {
    flex: 0.3,
    alignItems: 'flex-start',
    paddingLeft: 14,
    paddingRight: 20,
    paddingTop: 10,
  },
  postContent: {
    flex: 6,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    top: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5A6174',
    padding: 5,
  },
  date: {
    fontSize: 15,
    color: '#5A6174',
    padding: 5,
  },
  tag: {
    flex: 1,
    top: 10,
  },
  content: {
    fontSize: 15,
    color: '#5A6174',
    padding: 5,
    lineHeight: 22,
  },
  image: {
    width: '95%',
    height: 400,
    alignSelf: 'center',
    borderRadius: 12,
    margin: 10,
  },
})
