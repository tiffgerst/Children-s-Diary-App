import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Button from '../components/Button'
import TextInputMedium from '../components/TextInputMedium'
import Background2 from '../components/Background2'
import { theme } from '../src/core/theme'
import SkipButton from '../components/SkipButton'
import * as add from '../ip/config'

const emojiData = [
  { id: 1, emotion: 'Excited', emoji: require('../assets/moodIcons/Excited.png'), },
  { id: 2, emotion: 'Happy', emoji: require('../assets/moodIcons/Happy.png') },
  { id: 3, emotion: 'Confused', emoji: require('../assets/moodIcons/Confused.png'), },
  { id: 4, emotion: 'Grateful', emoji: require('../assets/moodIcons/Grateful.png'), },
  { id: 5, emotion: 'Calm', emoji: require('../assets/moodIcons/Calm.png') },
  { id: 6, emotion: 'Sad', emoji: require('../assets/moodIcons/Sad.png') },
  { id: 7, emotion: 'Angry', emoji: require('../assets/moodIcons/Angry.png') },
  { id: 8, emotion: 'Sleepy', emoji: require('../assets/moodIcons/Sleepy.png'), },
  { id: 9, emotion: 'Anxious', emoji: require('../assets/moodIcons/Anxious.png'), },
]

export default function HowAreYouFeelingScreen({ navigation }) {
  const [entryText, setEntryText] = useState([])
  const [emojis, setEmojis] = useState(emojiData)
  const [selectedEmojis, setSelectedEmojis] = useState([])
  const [userID, setUserID] = useState(null)

  // Obtain user ID from SecureStore
  useEffect(() => {
    const getData = async () => {
      const secureStoreID = await SecureStore.getItemAsync('userID').then(
        (id) => setUserID(id)
      )
    }
    getData()
  }, [])

  // Sumbit new Post to the databse with users selected mood icons and written input text
  const onSubmitPost = () => {
    const ip = add.ip
    const date = new Date()
    const dateTimeSQL = date.toISOString().slice(0, 19).replace('T', ' ')

    // console.log(dateTimeSQL)

    axios
      .post(`http://${ip}:3000/post/feelingEntry`, {
        userID,
        dateTimeSQL,
        entryText,
        selectedEmojis,
      })
      .then(async (response) => {
        console.log(response)
        navigation.navigate('Home')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const renderEmojis = ({ item, index }) => {
    const { id, emotion, emoji } = item

    const isSelected = selectedEmojis.filter((i) => i === id).length > 0 // checking if the emoji is already selected

    // keep track of the emojis that the user is selecting
    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelectedEmojis((prev) => prev.filter((i) => i !== id))
          } else {
            setSelectedEmojis((prev) => [...prev, id])
          }
        }}
      >
        <View style={isSelected ? styles.emojiSelected : styles.emojiView}>
          <Image source={item.emoji} style={styles.emojiImage} />
          <Text style={styles.emojiText}>{item.emotion}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Background2 style={styles.container}>
      <View>
        <Text style={styles.text}>Hi Sam!</Text>
      </View>
      <View>
        <Text style={styles.text2}>How are you feeling today?</Text>
      </View>
      {/* show all the emojis to the user. Use FlatList to render the items. */}
      <FlatList
        numColumns={3}
        contentContainerStyle={styles.grid}
        data={emojis}
        renderItem={renderEmojis}
        keyExtractor={(item) => `key-${item.id}`}
        scrollEnabled={false}
      />

      <TextInputMedium
        value={entryText.value}
        onChangeText={(text) => setEntryText({ value: text })}
        label="I feel like this because..."
      />
      <Button mode="contained" onPress={() => onSubmitPost()}>
        Post
      </Button>
      <SkipButton mode="contained" onPress={() => navigation.navigate('Home')}>
        Skip
      </SkipButton>
    </Background2>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  text2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: 25,
    alignSelf: 'flex-start',
  },
  grid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    overflow: 'hidden',
    marginBottom: 15,
  },
  emojiImage: {
    width: 37,
    height: 37,
    marginBottom: 5,
  },
  emojiText: {
    fontWeight: 'bold',
    color: '#5A6174',
  },
  emojiView: {
    flex: 0,
    flexDirection: 'column',
    width: 95,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    borderWidth: 0.5,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 1,
    padding: 7.5,
  },
  emojiSelected: {
    flex: 0,
    flexDirection: 'column',
    width: 95,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    borderWidth: 3,
    borderColor: '#F39055',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 1,
    padding: 7.5,
  },
})
