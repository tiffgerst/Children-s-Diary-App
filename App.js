import React, { useState, useEffect } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  ResetPasswordScreen,
  HowAreYouFeelingScreen,
  Home,
  Calendar,
  NewEntry,
  TextEntry,
  Customisation,
  Profile,
} from './screens'
import * as SecureStore from 'expo-secure-store'
const Stack = createStackNavigator()

export default function App() {
  const isLoggedIn = async () => {
    try {
      const credentials = await SecureStore.getItemAsync('token')
      if (credentials) {
        axios
          .get('http://192.168.0.75:3000/appUser/isLoggedIn', {
            headers: {
              Authorization: credentials,
            },
          })
          .then(() => {
            navigation.navigate('Home')
          })
          .catch((error) => {
            navigation.navigate('StartScreen')
          })
      }
    } catch (err) {
      console.log(err)
      console.log('hi')
    }
  }

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="StartScreen"
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen
            name="HowAreYouFeelingScreen"
            component={HowAreYouFeelingScreen}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="NewEntry" component={NewEntry} />
          <Stack.Screen name="TextEntry" component={TextEntry} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Customisation" component={Customisation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
