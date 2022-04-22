import { StyleSheet, Text } from 'react-native'
import Background from '../components/Background'
import SkipButton from '../components/SkipButton'
import { theme } from '../src/core/theme'

export default function ResetPassLinkSent({ navigation }) {
  return (
    <Background style={styles.container}>
      <Text style={styles.text2}>Password reset link sent!</Text>
      <SkipButton
        mode="contained"
        onPress={() => navigation.navigate('StartScreen')}
      >
        Login
      </SkipButton>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: 25,
  },
})
