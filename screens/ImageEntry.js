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
import Tag from '../components/Tag'
import TagButtonList from '../components/TagButtonList'
import * as ImagePicker from 'expo-image-picker'
import { v4 as uuid } from 'uuid'
import firebaseConfig from '../API/config/firebaseConfig.js'
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import * as add from '../ip/config'

initializeApp(firebaseConfig);

export default function ImageEntry({ route }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pickImage()
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

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
    console.log(a)
    if (pick.indexOf(a) == 0 && pick.length == 1) {
      console.log('hi')
      pick.shift()
    } else if (pick.indexOf(a) < 0) {
      console.log('b')
      pick.push(a)
    } else {
      console.log(pick.indexOf(a))
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
  const [image, setImage] = useState(null)
  const [imageURL, setImageURL] = useState()
  const pickImage = async () => {
    // Launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      const storage = getStorage()
      const imageRef = ref(storage, new Date().toISOString())
      const img = await fetch(result.uri)
      const bytes = await img.blob()
      const uploaded = await uploadBytes(imageRef, bytes)
      await getDownloadURL(imageRef).then((x) => {
        setImageURL(x);
        console.log(x);
      });
    }
  };


  const ip = add.ip
  const [titleText, setTitleText] = useState('')
  const [contentText, setContentText] = useState('')

  const onPost = () => {
    const unique_id = uuid()
    const unique_id_post = unique_id.slice(0, 8)
    if (titleText !== '') {
      // Add new post to the databse
      axios
        .post(`http://${ip}:3000/post/add`, {
          userID,
          background,
          privacy,
          titleText,
          contentText,
          imageURL,
          unique_id_post,
        })
        .then(async () => {

        //   // Link each tag to the post created
        //   selectedEmojis.forEach((moodIconID) =>
        //     axios
        //       .post(`http://${ip}:3000/moodIcons/postLink`, {
        //         moodIconID,
        //         unique_id_post,
        //       })
        //       .catch((error) => {
        //         console.log(error)
        //       })
        //   )

          navigation.navigate('Home')

        })
    }
  }

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

        <TouchableOpacity
          style={styles.post}
          onPress={() => onPost()}
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
      <View style={{ flex: 0.8, marginTop: -25 }}>
        <TextInput
          value={titleText.value}
          onChangeText={(text) => setTitleText({ value: text })}
          placeholder="Title"
          style={{
            fontSize: 22,
            paddingLeft: 20,
            paddingBottom: 5,
            fontWeight: 'bold',
          }}
        />
        <Text
          style={{
            fontSize: 14,
            paddingBottom: 7,
            paddingLeft: 20,
          }}
        >
          {getCurrentDate()}
        </Text>
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
          {/* <TagButtonList data={pick} /> */}

          {/* ) : (
          <View style={{ padding: 10 }}></View>
        )} */}
          <TextInput
            value={contentText.value}
            onChangeText={(text) => setContentText({ value: text })}
            placeholder="Write here :)"
            style={{
              color: '#000',
              fontSize: 14,
            }}
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
  image: {
    width: 330,
    height: 330,
    // alignSelf: 'center',
    borderRadius: 12,
    margin: 10,
  },
})
