import React, { useState, useEffect } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import FlashMessage from "react-native-flash-message";
import { theme } from './src/core/theme'
import {
  StartScreen,
  ResetPasswordScreen,
  HowAreYouFeelingScreen,
  Home,
  Calendar,
  NewEntry,
  TextEntry,
  ImageEntry,
  Customisation,
  Profile,
  //Record,
  PostFeed,
  ResetPassLinkSent,
} from './screens'

const Stack = createStackNavigator()

export default function App({ navigation }) {
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
          <Stack.Screen name="ImageEntry" component={ImageEntry} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Customisation" component={Customisation} />
          {/*<Stack.Screen name="Record" component={Record} />*/}
          <Stack.Screen name="PostFeed" component={PostFeed} />
          <Stack.Screen
            name="ResetPassLinkSent"
            component={ResetPassLinkSent}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </Provider>
  )
}
