import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons'
import { getStatusBarHeight } from 'react-native-status-bar-height'
//import { isLoggedIn } from '../helpers/isLoggedIn'

export default function NewEntry({ navigation }) {
  // useEffect(() => {
  //   let loggedIn = isLoggedIn()
  //   if (!loggedIn) {
  //     navigation.navigate('StartScreen')
  //   }
  //   console.log(loggedIn)
  // }, [])

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <View>
        <Text style={styles.title}> New Entry</Text>
      </View>
      <View style={{ marginStart: -9 }}>
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('TextEntry')}
          >
            <View>
              <MaterialCommunityIcons
                style={styles.icon1}
                name="text-subject"
                size={40}
                color="#5A6174"
              />
              <Text style={[styles.text]}>Text</Text>
            </View>
          </Button>

          <Button style={styles.button} mode="contained">
            <View>
              <MaterialCommunityIcons
                style={styles.icon1}
                name="microphone"
                size={40}
                color="#5A6174"
              />
              <Text style={styles.text}>Recording</Text>
            </View>
          </Button>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button style={[styles.button]} mode="contained">
            <View>
              <MaterialCommunityIcons
                style={styles.icon}
                name="camera"
                size={30}
                color="#5A6174"
              />
              <Text style={styles.text}>Photo / Video</Text>
            </View>
          </Button>
          <Button style={styles.button} mode="contained">
            <View>
              <FontAwesome
                style={styles.icon}
                name="paint-brush"
                size={30}
                color="#5A6174"
              />
              <Text style={styles.text}>Drawing</Text>
            </View>
          </Button>
        </View>
        <View style={styles.sugg}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="lightbulb"
            size={25}
            color="#5A6174"
          />
          <Text style={styles.textsugg}> Smart Suggestions</Text>
        </View>
        <View style={{ marginStart: 20 }}>
          <Button style={styles.buttonlong}></Button>
          <Button style={styles.buttonlong}></Button>
          <Button style={styles.buttonlong}>
            <Text>Random {'\u2728'}</Text>
          </Button>
          <Button
            style={{ marginStart: -15 }}
            onPress={() => navigation.navigate('TextEntry')}
          >
            View more ideas
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: getStatusBarHeight() + 30,
  },
  icon: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 7,
  },
  icon1: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5A6174',
    marginBottom: 5,
    alignSelf: 'center',
    paddingBottom: 10,
  },
  button: {
    backgroundColor: '#f2f2f2',
    width: 168,
    height: 89.1,
    borderRadius: 20,
    marginStart: 10,
    marginBottom: -5,
  },
  buttonlong: {
    backgroundColor: '#f2f2f2',
    width: 343,
    height: 55.31,
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: -5,
    marginStart: -30,
    color: 'black',
  },
  text: {
    color: '#5A6174',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textsugg: {
    color: '#5A6174',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  sugg: {
    alignSelf: 'flex-start',
    paddingTop: 45,
    flexDirection: 'row',
  },
})
