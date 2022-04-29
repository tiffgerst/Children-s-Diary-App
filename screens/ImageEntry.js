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
  Alert,
} from 'react-native'
import axios from 'axios'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker'
import { v4 as uuid } from 'uuid'
import { showMessage, hideMessage } from 'react-native-flash-message'
import { initializeApp } from 'firebase/app'
import firebaseConfig from '../API/config/firebaseConfig.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import BackButton from '../components/BackButton'
import Tag from '../components/Tag'
import BackgroundButton from '../components/backcolor'

// Connect to Firebase
initializeApp(firebaseConfig)

export default function ImageEntry({ route, navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pickImage()
    })
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [])

  // Get user ID from SecureStore
  const [userID, setUserID] = useState(null)
  useEffect(() => {
    const getData = async () => {
      const secureStoreID = await SecureStore.getItemAsync('userID').then(
        (id) => setUserID(id)
      )
    }
    getData()
  }, [])

  const dat = [
    '#FFA500',
    '#ffe6ff',
    '#e6ccff',
    '#ffff66',
    '#00ffcc',
    '#ccffff',
    '#fff',
  ]
  const tags = [
    'Family',
    'Friends',
    'Sports',
    'Dreams',
    'Social Worker',
    'Feelings',
    'School',
    'Holiday',
    'Food',
    'Shopping',
    'Travel',
  ]
  const a = []
  const [pick, setpick] = useState(a)
  const [modalVisible1, setModal1Visible] = useState('')
  const [modalVisible2, setModal2Visible] = useState('')
  const [modalVisible3, setModal3Visible] = useState('')
  const [privacy, setprivacy] = useState(true)
  const [check2, setcheck2] = useState('')
  const [check1, setcheck1] = useState('√')
  const [background, setbackground] = useState('#fff')
  const [tag, settag] = useState('')
  const title = route.params.title
  const [tit, settit] = useState(title)
  const [note, setNote] = useState('')

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
    'Dec',
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
  const update = (a) => {
    if (pick.indexOf(a) == 0 && pick.length == 1) {
      pick.shift()
    } else if (pick.indexOf(a) < 0) {
      pick.push(a)
    } else {
      pick.splice(pick.indexOf(a), 1)
    }
  }
  const bool = (x) => {
    if (pick.includes(x)) {
      return true
    } else {
      return false
    }
  }
  const renderItem = ({ item }) => (
    <BackgroundButton
      color={item}
      onPress={() => {
        setbackground(item)
      }}
    />
  )
  const cancel = () => {
    if (note !== '') {
      Alert.alert(
        'Unposted notes will be lost',
        `Are you sure you want to leave this entry? It will be deleted.`,
        [
          {
            text: 'Yes',
            onPress: () => {
              navigation.navigate('NewEntry')
            },
          },
          {
            text: 'No',
          },
        ]
      )
    } else {
      navigation.navigate('NewEntry')
    }
  }
  const onSubmitPost = async () => {
    const unique_id = uuid()
    const unique_id_post = unique_id.slice(0, 8)
    const userID = await SecureStore.getItemAsync('userID')

    if (tit == '' || note == '') {
      Alert.alert('Unable to post', 'Post must have a title and body text', {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.'
          ),
      })
    } else {
      // Sumbit new Post to the databse
      axios
        .post(`https://mirradiaryapp.azurewebsites.net/post/newPost`, {
          userID,
          note,
          unique_id_post,
          tit,
          privacy,
          background,
        })
        .then(async (response) => {
          const postID = response.data.postID
          axios
            // If post successfully created, add reward points to the users count
            .patch(
              `https://mirradiaryapp.azurewebsites.net/appUser/reward/` +
                userID,
              {
                userID: userID,
              }
            )
            .catch((error) => {
              console.log(error.message)
            })

          // Link each selected tag to the post created
          pick.forEach((tag) =>
            axios
              .post(`https://mirradiaryapp.azurewebsites.net/post/tags`, {
                tag: tag,
                postID: postID,
              })
              .catch((error) => {
                console.log(error)
              })
          )
          // Link selected image to the post created
          axios.post(`https://mirradiaryapp.azurewebsites.net/post/image`, {
            unique_id_post: unique_id_post,
            imageURL: imageURL,
          })

          navigation.navigate('Home')

          showMessage({
            message: 'Awesome!  New entry earned you 10 \u2B50',
            type: 'info',
            duration: '2000',
            floating: true,
            icon: { icon: '../assets/Star.png', position: 'right' },
            backgroundColor: '#7AC9A1',
            titleStyle: { fontWeight: 'bold', textAlign: 'center' },
            animationDuration: '275',
          })
        })
    }
  }

  const [image, setImage] = useState(null)
  const [imageURL, setImageURL] = useState()
  const pickImage = async () => {
    // Launch image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    // Upload selected image to Firebase Storage
    if (!result.cancelled) {
      setImage(result.uri)
      const storage = getStorage()
      const imageRef = ref(storage, new Date().toISOString())
      const img = await fetch(result.uri)
      const bytes = await img.blob()
      await uploadBytes(imageRef, bytes)
      await getDownloadURL(imageRef).then((url) => {
        setImageURL(url)
      })
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.row}>
        <BackButton goBack={cancel} style={{ position: 'relative' }} />
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
              <FlatList
                contentContainerStyle={styles.grid}
                data={dat}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                numColumns={3}
              />
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
            onBackdropPress={() =>
              setModal2Visible(!modalVisible2) & console.log(pick)
            }
          >
            <View style={styles.centeredView2}>
              <FlatList
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
                data={tags}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Tag
                    name={item}
                    bool={bool(item)}
                    onPress={() => {
                      update(item)
                    }}
                  >
                    {item}
                  </Tag>
                )}
              />
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
              >
                <Text>Private, only for me {check1}</Text>
              </TouchableOpacity>
              <Text style={{ paddingBottom: 8, paddingTop: -4 }}>
                ______________________
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setprivacy(false) & setcheck1('') & setcheck2('√')
                }
              >
                <Text>Share with my social worker {check2}</Text>
              </TouchableOpacity>
              <View style={styles.triangle3}></View>
            </View>
          </Modal>
        </View>

        <TouchableOpacity style={styles.post} onPress={() => onSubmitPost()}>
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
      <View style={{ flex: 0.8, marginTop: -25 }}>
        <TextInput
          placeholder="Title"
          autoFocus
          onChangeText={settit}
          style={styles.title}
        >
          {title}
        </TextInput>
        <Text style={styles.date}>{getCurrentDate()}</Text>
        <View style={{ paddingLeft: 20 }}>
          <FlatList
            contentContainerStyle={{ marginLeft: -4 }}
            horizontal
            data={pick}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Tag name={item} bool={true}>
                {item}
              </Tag>
            )}
          />
          <TextInput
            value={note}
            onChangeText={(text) => setNote(text)}
            placeholder="Write here :)"
            style={styles.content}
            multiline={true}
          />
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  centeredView1: {
    height: 150,
    width: 220,
    top: -270,
    left: 30,
    margin: 20,
    backgroundColor: '#99ff99',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
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
    height: 215,
    width: 200,
    top: -245,
    left: 30,
    margin: 20,
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#ffe6ff',
    borderRadius: 20,
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
    backgroundColor: '#e6ccff',
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
    top: -145,
    left: -75,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: '#99ff99',
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  triangle2: {
    width: 10,
    height: 10,
    position: 'relative',
    top: -215,
    left: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: '#e6ccff',
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
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: '#e6ccff',
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
  grid: { alignItems: 'center', padding: 5 },

  button: {
    width: 46,
    height: 46,
    color: '#5A6174',
    marginLeft: 20,
  },
  row: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 50,
  },
  post: {
    height: 36,
    width: 82,
    backgroundColor: '#55B7DE',
    borderRadius: 6,
    top: -8,
    left: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5A6174',
    padding: 5,
    marginLeft: 19,
    marginTop: 12,
  },
  date: {
    fontSize: 15,
    color: '#5A6174',
    padding: 5,
    marginLeft: 20,
  },
  content: {
    fontSize: 15,
    color: '#5A6174',
    padding: 5,
    lineHeight: 22,
    marginLeft: 1,
    marginTop: 10,
  },
  image: {
    width: 330,
    height: 330,
    borderRadius: 12,
    margin: 10,
  },
})
