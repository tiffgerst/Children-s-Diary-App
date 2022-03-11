import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons'
import Background2 from '../components/Background2'
import BackButton from '../components/BackButton'
import { theme } from '../src/core/theme'
import Button from '../components/Button'

export default function NewEntry({ navigation }) {
  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <View>
        <Text style={styles.title}> New Entry</Text>
      </View>
      <View style={{ marginStart: 30 }}>
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => console.log('Pressed')}
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
    paddingTop: 100,
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