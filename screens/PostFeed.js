import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import axios from 'axios'
import moment from 'moment'
import BackButton from '../components/BackButton'
import TagButtonList from '../components/TagButtonList'
import MoodIconList from '../components/MoodIconList'

export default function PostFeed({ route, navigation }) {
  const [backgroundColor, setBackgroundColor] = useState('')
  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [uniqueID, setuniqueID] = useState('')
  const [priv, setprivacy] = useState('')
  let [tag, setTag] = useState('')
  const [imageURL, setImageURL] = useState('')
  let [emoji, setEmoji] = useState('')
  const { postID } = route.params


  React.useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        // get post data from api
        const getData = async () => {
          const apiResponse = await fetch(`https://mirradiaryapp.azurewebsites.net/post/` + postID)
          const data = await apiResponse.json()
          const backgroundColor = await data[0].backgroundColor
          const date = await data[0].createDateTime
          const title = await data[0].titleText
          const content = await data[0].contentText
          const tag = await data[0].tagNameAll.split(', ')
          const imageURL = await data[0].imageURL
          const emoji = await data[0].emojiUrlAll.split(', ')
          const id = await data[0].uniqueID
          const privacy = await data[0].privacy
          setBackgroundColor(backgroundColor)
          setDate(moment(date).format('ddd, DD MMM YYYY HH:MM'))
          setTitle(title)
          setContent(content)
          setTag(tag)
          setImageURL(imageURL)
          setEmoji(emoji)
          setuniqueID(id)
          if (privacy == 0) {
            setprivacy(false)
          } else {
            setprivacy(true)
          }
        }
        getData()
      },
      []
    )
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [])
  const cancel = () => {
    Alert.alert('Delete?', `Are you sure you want to delete this entry?`, [
      {
        text: 'Yes',
        onPress: () => {
          remove()
          navigation.navigate('Home')
        },
      },
      {
        text: 'No',
      },
    ])
  }

  const remove = async () => {
    axios
      .post(`https://mirradiaryapp.azurewebsites.net/post/deletePost`, {
        postID,
        uniqueID,
      })

      .catch((error) => {
        console.log(error)
      })
  }
  if (tag[0] === '') {
    tag = ''
  }
  if (emoji[0] === '') {
    emoji = ''
  }

  return (
    <View style={(styles.container, { backgroundColor })}>
      <ImageBackground resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.row}>
          <BackButton
            goBack={navigation.goBack}
            style={{ position: 'relative' }}
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('EditEntry', {
                postID,
                date,
                title,
                content,
                tag,
                imageURL,
                emoji,
                backgroundColor,
                priv,
              })
            }
          >
            <Text style={styles.buttonFont}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => cancel()}
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
            {emoji ? <MoodIconList data={emoji} /> : <View />}
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
    width: 330,
    height: 330,
    alignSelf: 'center',
    borderRadius: 12,
    margin: 10,
  },
})
