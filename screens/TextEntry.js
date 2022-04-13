import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import BackButton from '../components/BackButton'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'

export default function TextEntry() {
  const [note, setNote] = useState('')
  const navigation = useNavigation()
  const weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const month = [
    'Jan',
    'Feb',
    'March',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dez',
  ]
  const getCurrentDate = () => {
    let date = new Date()
    let day = weekday[date.getDay()]
    let num = date.getDate()
    let name = month[date.getMonth()]
    let year = date.getFullYear()
    let hour = date.getHours()
    let min = date.getMinutes()

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return day + ', ' + num + ' ' + name + ' ' + year + ' ' + hour + ':' + min //format: dd-mm-yyyy;
  }

  const saveNote = async () => {
    const value = await SecureStore.getItemAsync('Notes')
    const n = value ? JSON.parse(value) : []
    n.push(note)
    await SecureStore.setItemAsync('Notes', JSON.stringify(n)).then(() =>
      navigation.navigate('AllNotes')
    )
    setNote('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BackButton
          goBack={navigation.goBack}
          style={{ position: 'relative' }}
        />
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
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
          autoFocus
          style={{
            fontSize: 22,
            paddingLeft: 20,
            paddingBottom: 5,
            marginTop: -30,
            fontWeight: 'bold',
            backgroundColor: 'white',
          }}
        ></TextInput>
        <Text
          style={{
            fontSize: 14,
            paddingBottom: 7,
            paddingLeft: 20,
          }}
        >
          {getCurrentDate()}
        </Text>
        <Text
          style={{
            fontSize: 14,
            paddingBottom: 7,
            paddingLeft: 20,
          }}
        >
          Tags
        </Text>
        <TextInput
          placeholder="Write here :)"
          value={note}
          onChangeText={setNote}
          style={{ color: '#000', fontSize: 14, paddingLeft: 20 }}
          multiline={true}
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
    justifyContent: 'space-around',
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
