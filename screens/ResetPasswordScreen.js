import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
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
    }
  }

  return (
    <Background style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <TextInput
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
