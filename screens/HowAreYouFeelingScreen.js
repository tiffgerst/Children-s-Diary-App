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
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import * as SecureStore from 'expo-secure-store'
import { showMessage, hideMessage } from 'react-native-flash-message'
import Button from '../components/Button'
import TextInputMedium from '../components/TextInputMedium'
import Background2 from '../components/Background2'
import { theme } from '../src/core/theme'
import SkipButton from '../components/SkipButton'
import * as add from '../ip/config'

export default function HowAreYouFeelingScreen({ navigation }) {
  const [entryText, setEntryText] = useState('')
  const [displayName, setdisplayName] = useState()
  const [emojis, setEmojis] = useState(null)
  const [selectedEmojis, setSelectedEmojis] = useState([])
  const [userID, setUserID] = useState(null)
  const ip = add.ip

  // Obtain user ID from SecureStore
  useEffect(() => {
    const getData = async () => {
      // Obtain user ID from SecureStore
      const secureStoreID = await SecureStore.getItemAsync('userID').then(
        (id) => setUserID(id)
      )
      console.log(userID)
      const userID = await SecureStore.getItemAsync('userID')
      const apiResponse = await fetch(`http://${ip}:3000/appUser/getUser/` + userID)
      const userinfo = await apiResponse.json()
      const display_name = userinfo[0].displayname
      setdisplayName(display_name)

      // GET default mood icon emojis
      axios
        .get(`http://${ip}:3000/moodIcons/getMoodIcons`, {
          userID,
        })
        .then(async (response) => {
          setEmojis(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getData()
  }, [])

  const onSubmitPost = () => {
    const unique_id = uuid()
    const unique_id_post = unique_id.slice(0, 8)

    if (selectedEmojis.length !== 0 && entryText !== '') {
      // Sumbit new Post to the databse with users written input text
      axios
        .post(`http://${ip}:3000/post/feelingEntry`, {
          userID,
          entryText,
          unique_id_post,
          selectedEmojis,
        })
        .then(async () => {
          axios
            // If post successfully created, add reward points to the users count
            .patch(`http://${ip}:3000/appUser/reward/` + userID, {
              userID,
            })
            .catch((error) => {
              console.log(error)
            })

          // Link each selected emoji to the post created
          selectedEmojis.forEach((moodIconID) =>
            axios
              .post(`http://${ip}:3000/moodIcons/postLink`, {
                moodIconID,
                unique_id_post,
              })
              .catch((error) => {
                console.log(error)
              })
          )

          navigation.navigate('Home')

          showMessage({
            message: 'Awesome!  New entry earned you 5 \u2B50',
            type: 'info',
            duration: '2000',
            floating: true,
            icon: { icon: '../assets/Star.png', position: 'right' },
            backgroundColor: '#7AC9A1',
            titleStyle: { fontWeight: 'bold', textAlign: 'center' },
            animationDuration: '275',
          })
        })
    }
  }

  const renderEmojis = ({ item, index }) => {
    const { moodIconID, moodIconURL, moodIconName } = item

    const isSelected = selectedEmojis.filter((i) => i === moodIconID).length > 0 // checking if the emoji is already selected

    // keep track of the emojis that the user is selecting
    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelectedEmojis((prev) => prev.filter((i) => i !== moodIconID))
          } else {
            setSelectedEmojis((prev) => [...prev, moodIconID])
          }
        }}
      >
        <View style={isSelected ? styles.emojiSelected : styles.emojiView}>
          <Image source={{ uri: item.moodIconURL }} style={styles.emojiImage} />
          <Text style={styles.emojiText}>{item.moodIconName}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Background2 style={styles.container}>
      <View>
        <Text style={styles.text}>Hi {displayName}!</Text>
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
        keyExtractor={(item) => `key-${item.moodIconID}`}
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
