import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Background3 from '../components/Background3'
import BackButton from '../components/BackButton'

export default function ProfileFeed({ navigation }) {
  return (
    <Background3 style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <Text>Profile Feed</Text>
    </Background3>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
