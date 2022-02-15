import React from 'react'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native'
import { theme } from '../src/core/theme'

export default function Background({ children }) {
  return (
    <View style={styles.background}>
      <ImageBackground
        source={require('../assets/Artwork1.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.tint,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '102%',
    height: '103%',
    overflow: 'visible',
    position: 'absolute',
  },
})
