import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[styles.button, mode === 'outlined', style]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    height: 25,
    borderRadius: 6,
    backgroundColor: '#55B7DE',
    overflow: 'visible',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFF',
    lineHeight: 9,
  },
})
