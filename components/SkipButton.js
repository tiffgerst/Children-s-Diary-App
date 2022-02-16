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
    width: 70,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#55B7DE',
    overflow: 'visible',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
})
