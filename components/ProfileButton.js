import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'


export default function ProfileButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProfileFeed')} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/profile_button.png')}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    right: 4,
  },
  image: {
    width: 28,
    height: 28,
  },
})