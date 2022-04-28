import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import axios from 'axios'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Background from '../components/Background'
import { emailValidator } from '../helpers/emailValidator'
import BackButton from '../components/BackButton'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const onSubmitPressed = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
    } else {
      axios
        .get(`https://mirradiaryapp.azurewebsites.net/appUser/getEmail/` + email.value, {
          email: email.value,
        })
        .then(async (response) => {
          const responseArr = response.data
          if (responseArr.length === 0) {
            setEmail({ error: 'No account associated with this email' })
          } else {
            const sendResetLink = responseArr[0].email
            navigation.navigate('ResetPassLinkSent')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <Background style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <TextInput
        autoCapitalize="none"
        value={email.value}
        error={email.error}
        errorText={email.error}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        label="Email address"
        description="You will receive an email with password reset link."
      />
      <Button onPress={onSubmitPressed} mode="contained">
        Send Instructions
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
})
