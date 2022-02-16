/* eslint-disable react/react-in-jsx-scope */
import { View, StyleSheet } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../src/core/theme'

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        multiline
        theme={{ roundness: 10 }}
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#F2F2F2',
    height: 200,
  },
  description: {
    fontSize: 15,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
})
