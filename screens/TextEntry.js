import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons'
import { TextInput } from 'react-native-paper'

export default function TextEntry({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BackButton
          goBack={navigation.goBack}
          style={{ position: 'relative' }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('pressed')}
        >
          <Text>
            <MaterialCommunityIcons
              name="plus-circle"
              size={29}
              color="#5A6174"
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('pressed')}
        >
          <Text>
            <MaterialCommunityIcons name="palette" size={29} color="#5A6174" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('pressed')}
        >
          <Text>
            <FontAwesome name="tag" size={29} color="#5A6174" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('pressed')}
        >
          <Text>
            <FontAwesome name="unlock-alt" size={29} color="#5A6174" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.post}
          onPress={() => console.log('pressed')}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              justifyContent: 'center',
              alignSelf: 'center',
              padding: 8,
              fontWeight: 'bold',
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <TextInput
          placeholder="Title"
          style={{
            fontSize: 22,
            paddingLeft: 20,
            marginTop: -30,
            fontWeight: 'bold',
            backgroundColor: 'white',
          }}
        ></TextInput>
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
  },
  button: {
    backgroundColor: '#fff',
    width: 46,
    height: 46,
    color: '#5A6174',
    marginLeft: 6,
  },
  row: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 70,
    paddingTop: 10,
  },
  post: {
    height: 36,
    width: 82,
    backgroundColor: '#55B7DE',
    borderRadius: 6,
    top: -8,
    left: -8,
  },
  title: {},
})
