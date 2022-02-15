import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Background from '../components/Background'
import { usernameValidator } from '../helpers/usernameValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { theme } from '../src/core/theme'

export default function StartScreen({ navigation }) {
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const usernameError = usernameValidator(username.value)
    const passwordError = passwordValidator(password.value)
    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError })
      setPassword({ ...password, error: passwordError })
    }
  }

  return (
    <Background style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
      <TextInput
        value={username.value}
        error={username.error}
        errorText={username.error}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        label="Username"
      />
      <TextInput
        value={password.value}
        error={password.error}
        errorText={password.error}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        label="Password"
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        onPress={() => navigation.navigate('HowAreYouFeelingScreen')}
        mode="contained"
      >
        Sign In
      </Button>
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
  image: {
    width: '100%',
    overflow: 'visible',
    marginBottom: 45,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
})
