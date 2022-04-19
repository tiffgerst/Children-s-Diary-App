import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Background from '../components/Background'
import { usernameValidator } from '../helpers/usernameValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { theme } from '../src/core/theme'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

export default function StartScreen({ navigation }) {
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [login, setLogin] = useState()

  const onLoginPressed = () => {
    const usernameError = usernameValidator(username.value)
    const passwordError = passwordValidator(password.value)
    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError })
      setPassword({ ...password, error: passwordError })
    } else {
      axios
        .post(`https://mirradiaryapp.azurewebsites.net/appUser/login`, {
          username: username.value,
          passwordHash: password.value,
        })
        .then(async (response) => {
          const accessToken = response.data.token
          const userID = response.data.userID.toString()
          await SecureStore.setItemAsync('token', accessToken)
          await SecureStore.setItemAsync('userID', userID)
          navigation.navigate('HowAreYouFeelingScreen')
        })
        .catch((error) => {
          console.log(error)
          setLogin(error.response.data.message)
        })
    }
  }
  return (
    <Background style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
      <TextInput
        value={username.value}
        error={username.error}
        errorText={username.error}
        autoCapitalize="none"
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        label="Username"
      />
      <TextInput
        value={password.value}
        error={password.error}
        errorText={password.error}
        autoCapitalize="none"
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        label="Password"
        secureTextEntry
        errorText={login}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button onPress={() => onLoginPressed()} mode="contained">
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
