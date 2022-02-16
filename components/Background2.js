import React from 'react'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native'
import { theme } from '../src/core/theme'

export default function Background2({ children }) {
  return (
    <View style={styles.background}>
      <ImageBackground
        source={require('../assets/Artwork2.png')}
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    maxHeight: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75,
  },
  backgroundImage: {
    width: '102%',
    height: '103%',
    overflow: 'visible',
    position: 'absolute',
  },
})
