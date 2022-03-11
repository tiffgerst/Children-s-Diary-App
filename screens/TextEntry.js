import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons'

export default function TextEntry({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <BackButton goBack={navigation.goBack} />
        <Button
          style={styles.button}
          mode="text"
          onpress={() => console.log('pressed')}
        >
          <MaterialCommunityIcons
            name="text-subject"
            size={40}
            color="#5A6174"
          />
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  button: {
    backgroundColor: '#fff',
    width: 46,
    height: 46,
    color: '#5A6174',
  },
})
