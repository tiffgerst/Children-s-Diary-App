import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native'
import axios from 'axios'
import api from '../connections/api'
import BackButton from '../components/BackButton'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import BackgroundButton from '../components/backcolor'

export default function TextEntry({ route }) {
  const [modalVisible1, setModal1Visible] = useState('')
  const [modalVisible2, setModal2Visible] = useState('')
  const [modalVisible3, setModal3Visible] = useState('')
  const [privacy, setprivacy] = useState(true)
  const [check2, setcheck2] = useState('')
  const [check1, setcheck1] = useState('√')
  const [background, setbackground] = useState('#fff')
  const [dat, setdat] = useState('')
  const title = route.params.title
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

    return day + ', ' + num + ' ' + name + ' ' + year + ' ' + hour + ':' + min
  }
  const getBackground = () => {
    api
      .get(`background/`)
      .then((response) => {
        const arr = []
        for (let i = 0; i < response.data.length; i++) {
          arr[i] = {
            id: response.data[i].backgroundID,
            color: response.data[i].backgroundURL,
          }
        }
        setdat(arr)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    getBackground()
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.row}>
        <BackButton
          goBack={navigation.goBack}
          style={{ position: 'relative' }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModal1Visible(!modalVisible1)
          }}
        >
          <Text>
            <MaterialCommunityIcons name="palette" size={29} color="#5A6174" />
          </Text>
        </TouchableOpacity>
        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible1}
            onBackdropPress={() => setModal1Visible(!modalVisible1)}
          >
            <View style={styles.centeredView1}>
              <View style={styles.triangle}></View>
            </View>
          </Modal>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModal2Visible(!modalVisible2)}
        >
          <Text>
            <FontAwesome name="tag" size={29} color="#5A6174" />
          </Text>
        </TouchableOpacity>
        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible2}
            onBackdropPress={() => setModal2Visible(!modalVisible2)}
          >
            <View style={styles.centeredView2}>
              <View style={styles.triangle2}></View>
            </View>
          </Modal>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModal3Visible(!modalVisible3)}
        >
          <Text>
            <FontAwesome name="unlock-alt" size={29} color="#5A6174" />
          </Text>
        </TouchableOpacity>
        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible3}
            onBackdropPress={() => setModal3Visible(!modalVisible3)}
          >
            <View style={styles.centeredView3}>
              <TouchableOpacity
                onPress={() =>
                  setprivacy(true) & setcheck1('√') & setcheck2('')
                }
                style={styles.lock}
              >
                <Text>Private, only for me {check1}</Text>
              </TouchableOpacity>
              <Text>-----------------------</Text>
              <TouchableOpacity
                onPress={() =>
                  setprivacy(false) & setcheck1('') & setcheck2('√')
                }
                style={styles.lock}
              >
                <Text>Share with my social worker {check2}</Text>
              </TouchableOpacity>
              <View style={styles.triangle3}></View>
            </View>
          </Modal>
        </View>

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
      <View>
        <TextInput
          placeholder="Title"
          autoFocus
          style={{
            fontSize: 22,
            paddingLeft: 20,
            paddingBottom: 5,
            marginTop: -60,
            fontWeight: 'bold',
          }}
        >
          {title}
        </TextInput>
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

        <Text
          style={{
            fontSize: 14,
            paddingBottom: 7,
            paddingLeft: 20,
          }}
        >
          Tags
        </Text>
        <BackgroundButton color={'pink'} />
        <Text>Hi</Text>
        <FlatList
          contentContainerStyle={styles.grid}
          data={dat}
          renderItem={({ item }) => <BackgroundButton color={item.color} />}
          numColumns={3}
        />
        <Text>Hi</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  centeredView1: {
    height: 100,
    width: 220,
    top: -290,
    left: 30,
    margin: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView2: {
    height: 100,
    width: 220,
    top: -290,
    left: 30,
    margin: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView3: {
    height: 100,
    width: 200,
    top: -290,
    left: 30,
    margin: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  triangle: {
    width: 10,
    height: 10,
    position: 'relative',
    top: -55,
    left: -75,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'lightgrey',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  triangle2: {
    width: 10,
    height: 10,
    position: 'relative',
    top: -55,
    left: -10,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'lightgrey',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  triangle3: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: -10,
    left: 155,
    backgroundColor: '#f2f2f2',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'lightgrey',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  grid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    overflow: 'scroll',
    marginBottom: 15,
  },

  button: {
    width: 46,
    height: 46,
    color: '#5A6174',
    marginLeft: 20,
  },
  row: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 5,
  },
  post: {
    height: 36,
    width: 82,
    backgroundColor: '#55B7DE',
    borderRadius: 6,
    top: -8,
    left: 20,
  },
  lock: {},
})
