import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Button from '../components/Button'
import TextInputMedium from '../components/TextInputMedium'
import Background2 from '../components/Background2'
import { theme } from '../src/core/theme'
import SkipButton from '../components/SkipButton'

const emojiData = [
  { id: 1, emotion: 'Excited', emoji: require('../assets/Excited.png') },
  { id: 1, emotion: 'Happy', emoji: require('../assets/Excited.png') },
  { id: 1, emotion: 'Confused', emoji: require('../assets/Excited.png') },
  { id: 1, emotion: 'Grateful', emoji: require('../assets/Excited.png') },
  { id: 1, emotion: 'Calm', emoji: require('../assets/Excited.png') },
  { id: 1, emotion: 'Sad', emoji: require('../assets/Excited.png') },
  { id: 1, emotion: 'Angry', emoji: require('../assets/Excited.png') },
  { id: 1, emotion: 'Sleepy', emoji: require('../assets/Excited.png') },
  { id: 1, emotion: 'Anxious', emoji: require('../assets/Excited.png') },
]

export default function HowAreYouFeelingScreen({ navigation }) {
  const [isLoading, setisLoading] = useState(true)
  const [data, setData] = useState([])
  const [emojiList, setEmojiList] = useState([])

  useEffect(() => {
    getEmojiData()
    return () => {}
  }, [])

  const getEmojiData = () => {
    setData(emojiData)
    setisLoading(false)
  }

  const onSelectEmoji = (item, index) => {
    const emojiArr = data.map((newEmoji) => {
      if (newEmoji.id === item.id) {
        return {
          ...newEmoji,
          selected: true,
        }
      }
      return {
        ...newEmoji,
        selected: false,
      }
    })
    setData(newEmoji)
    console.log(setData)
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => onSelectEmoji}>
        <View
          style={{
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
          }}
        >
          <Image
            source={item.emoji}
            style={{
              width: 37,
              height: 37,
              marginBottom: 5,
            }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#5A6174',
            }}
          >
            {item.emotion}
          </Text>
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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          numColumns={3}
          contentContainerStyle={styles.grid}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `key-${item.id}`}
        />
      )}
      <TextInputMedium
        value={data.value}
        onChangeText={(text) => setData({ value: text, error: '' })}
        label="I feel like this because..."
      />
      <Button mode="contained" onPress={() => navigation.navigate('Home')}>
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
})
