import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={require('../assets/add.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    right: -15,
    margin: 0,
    padding: 0,
  },
  image: {
    width: 90,
    height: 90,
  },
})
