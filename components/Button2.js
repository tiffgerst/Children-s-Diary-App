import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../src/core/theme'

export default function Button2({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#EEEEEE',
    marginVertical: 0,
    paddingVertical: 2,
    borderRadius: 10,
  },
  text: {
    color: '#5A6174',
    fontSize: 15,
    lineHeight: 26,
  },
})