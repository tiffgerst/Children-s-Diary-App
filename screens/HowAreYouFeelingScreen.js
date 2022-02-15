import React, { useState } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import Button from '../components/Button'
import TextInputMedium from '../components/TextInputMedium'
import Background2 from '../components/Background2'
import Emoji from '../components/Emoji'
import { theme } from '../src/core/theme'
import SkipButton from '../components/SkipButton'

const emojiData = [
  { emotion: 'Excited', emoji: require('../assets/Excited.png') },
  { emotion: 'Happy', emoji: require('../assets/Excited.png') },
  { emotion: 'Confused', emoji: require('../assets/Excited.png') },
  { emotion: 'Grateful', emoji: require('../assets/Excited.png') },
  { emotion: 'Calm', emoji: require('../assets/Excited.png') },
  { emotion: 'Sad', emoji: require('../assets/Excited.png') },
  { emotion: 'Angry', emoji: require('../assets/Excited.png') },
  { emotion: 'Sleepy', emoji: require('../assets/Excited.png') },
  { emotion: 'Anxious', emoji: require('../assets/Excited.png') },
]

export default function HowAreYouFeelingScreen({ navigation }) {
  const [feelings, setFeelings] = useState({ value: '', error: '' })

  return (
    <Background2 style={styles.container}>
      <View>
        <Text style={styles.text}>Hi Sam!</Text>
      </View>
      <View>
        <Text style={styles.text2}>How are you feeling today?</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.grid}
        data={emojiData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Emoji emotion={item} />}
        numColumns={3}
      />
      <TextInputMedium
        value={feelings.value}
        onChangeText={(text) => setFeelings({ value: text, error: '' })}
        label="I feel like this because..."
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('JournalFeed')}
      >
        Post
      </Button>
      <SkipButton
        mode="contained"
        onPress={() => navigation.navigate('JournalFeed')}
      >
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
