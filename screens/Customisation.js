import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Animated,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native'

import { showMessage, hideMessage } from 'react-native-flash-message'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Background3 from '../components/Background3'
import TextInputMedium from '../components/TextInputMedium'
import BackButton from '../components/BackButton'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export default function Customisation({ navigation }) {
  const [postData, setPostData] = useState()
  const [entryText, setEntryText] = useState('')
  const [userID, setUserID] = useState(null)
  const [avatarID, setAvatarID] = useState(null)
  const [avatarURL, setAvatarURL] = useState(null)
  const [animation, setAnimation] = useState(new Animated.Value(0))
  const { height } = Dimensions.get('window')

  const [refreshing, setRefreshing] = useState(false)

  // Get information including display name, avatarID, and avatar URL from databse
  const getData = async () => {
    const userID = await SecureStore.getItemAsync('userID')
    const apiResponse = await fetch(
      `https://mirradiaryapp.azurewebsites.net/appUser/getUser/` + userID
    )
    const data = await apiResponse.json()
    const display_name = data[0].displayname
    const avatarID = data[0].avatarID
    setUserID(userID)
    setPostData(display_name)
    setAvatarID(avatarID)
    const URL = await fetch(
      `https://mirradiaryapp.azurewebsites.net/avatar/getAvatarURL/` + avatarID
    )
    const avatarinfo = await URL.json()
    const avatarURL = avatarinfo[0].avatarURL
    setAvatarURL(avatarURL)
  }

  useEffect(() => {
    getData()
  }, [])

  // Refresh the page
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getData()
    wait(2000).then(() => setRefreshing(false))
  }, [])

  // Update the display name of the user in the database
  const updateName = () => {
    if (entryText !== '') {
      axios
        .patch(
          `https://mirradiaryapp.azurewebsites.net/appUser/displayname/` +
            userID,
          {
            id: userID,
            displayName: entryText,
          }
        )
        .catch((error) => {
          console.log(error)
        })
      showMessage({
        message:
          'You have changed your display name. Please refresh the page to reflect the change.',
        type: 'info',
        duration: '3000',
        floating: true,
        backgroundColor: '#7AC9A1',
        titleStyle: { fontWeight: 'bold', textAlign: 'center' },
        animationDuration: '275',
      })
    }
  }

  // Update the avatarID of the user in the database
  const updateAvatar = (newID) => {
    axios
      .patch(
        `https://mirradiaryapp.azurewebsites.net/appUser/avatar/` + userID,
        {
          id: userID,
          avatarID: newID,
        }
      )
      .catch((error) => {
        console.log(error)
      })
    showMessage({
      message:
        'You have changed your avatar. Please refresh the page to reflect the change.',
      type: 'info',
      duration: '3000',
      floating: true,
      backgroundColor: '#7AC9A1',
      titleStyle: { fontWeight: 'bold', textAlign: 'center' },
      animationDuration: '275',
    })
  }
  
  // Animation functions
  const color = animation.interpolate({
    inputRange: [0, 0.2, 1.8, 2],
    outputRange: [
      'rgba(225, 255, 255, 0.0)',
      'rgba(45, 57, 82, 0.5)',
      'rgba(45, 57, 82, 0.8)',
      'rgba(225, 255, 255, 0.0)',
    ],
  })
  const openModal = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })
  const saveModal = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [0, -height],
    extrapolate: 'clamp',
  })
  const modalTrigger = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }
  const close = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }
  const save = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      animation.setValue(0)
    })
  }
  const open = {
    transform: [{ scale: openModal }, { translateY: saveModal }],
  }
  const background = {
    backgroundColor: color,
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Background3 style={styles.background}>
        <BackButton goBack={navigation.goBack} />

        <Text style={styles.title}>Customisation</Text>
        <Text style={styles.text2}>Display Name</Text>

        <TextInputMedium
          style={styles.textbox}
          value={entryText.value}
          onChangeText={(text) => setEntryText(text)}
          label={postData}
        />
        <View>
          <TouchableOpacity
            style={[styles.button, styles.position5]}
            onPress={() => updateName()}
          >
            <Text style={styles.text3}>Save</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/line.png')} style={styles.line} />

        <Text style={styles.text4}>Avatar</Text>
        <Image source={{ uri: avatarURL }} style={styles.image} />

        <View>
          <View>
            <TouchableOpacity
              style={[styles.button, styles.position2]}
              onPress={modalTrigger}
            >
              <Text style={styles.text3}>Change</Text>
            </TouchableOpacity>
          </View>

          <Animated.View style={[styles.background2, background]}>
            <Animated.View style={[open]}>
              <Image
                source={require('../assets/grey1.png')}
                style={styles.grey1}
              />
              <View style={[styles.wrap, styles.center]}>
                <Text style={styles.text5}>Choose Your Avatar</Text>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(1)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-01.jpg')}
                    style={styles.avatar_01}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(2)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-02.jpg')}
                    style={styles.avatar_02}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(3)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-03.jpg')}
                    style={styles.avatar_03}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(4)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-04.jpg')}
                    style={styles.avatar_04}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(5)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-05.jpg')}
                    style={styles.avatar_05}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(6)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-06.jpg')}
                    style={styles.avatar_06}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(7)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-07.jpg')}
                    style={styles.avatar_07}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(8)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-08.jpg')}
                    style={styles.avatar_08}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(9)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-09.jpg')}
                    style={styles.avatar_09}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(10)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-10.jpg')}
                    style={styles.avatar_10}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(11)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-11.jpg')}
                    style={styles.avatar_11}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(12)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-12.jpg')}
                    style={styles.avatar_12}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(13)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-13.jpg')}
                    style={styles.avatar_13}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(14)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-14.jpg')}
                    style={styles.avatar_14}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(15)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-15.jpg')}
                    style={styles.avatar_15}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.close_button]}
                  onPress={close}
                  onPressIn={() => {
                    updateAvatar(16)
                  }}
                >
                  <Image
                    source={require('../assets/avatars/avatars-16.jpg')}
                    style={styles.avatar_16}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.wrap2, styles.center]}>
                <Text style={styles.text6}>Custom Avatars</Text>
                <TouchableOpacity style={[styles.close_button]} onPress={close}>
                  <Image
                    source={require('../assets/avatar_sam.png')}
                    style={styles.avatar_sam}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.close_button]} onPress={close}>
                  <Image
                    source={require('../assets/avatar_add.png')}
                    style={styles.avatar_add}
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </View>

        <Image source={require('../assets/line.png')} style={styles.line2} />
        <Text style={styles.text7}>Mood Icons</Text>
        <Image source={require('../assets/moods.png')} style={styles.image3} />

        {/* <View>
        <View>
        <TouchableOpacity style={[styles.button, styles.position4]} onPress={modalTrigger}>
            <Text style={styles.text3}>
                Change
            </Text>
        </TouchableOpacity>
        </View>
        </View> */}
      </Background3>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '90%',
    height: '90%',
    // backgroundColor: theme.colors.tint,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5A6174',
    left: 75,
    right: 0,
    top: 65,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    position: 'absolute',
    color: '#5A6174',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: 20,
    right: 0,
    top: 130,
    bottom: 0,
  },
  textbox: {
    left: 0,
    right: 0,
    top: -240,
    bottom: 0,
    height: 40,
    width: '60%',
  },
  line: {
    width: 350,
    left: 0,
    right: 0,
    top: -210,
    bottom: 0,
  },
  line2: {
    width: 350,
    left: 0,
    right: 0,
    top: 10,
    bottom: 0,
    zIndex: -10,
  },
  text4: {
    position: 'absolute',
    color: '#5A6174',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: 20,
    right: 0,
    top: 270,
    bottom: 0,
  },
  image: {
    position: 'absolute',
    width: 120,
    height: 120,
    left: 20,
    top: 310,
    borderRadius: 80,
  },
  grey1: {
    position: 'absolute',
    width: 343,
    height: 500,
    left: -172,
    right: 0,
    top: -128,
    bottom: 0,
    flex: 1,
    zIndex: 0,
  },
  text5: {
    position: 'absolute',
    color: '#5A6174',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: 5,
    right: 0,
    top: -30,
    bottom: 0,
    zIndex: 100,
    flex: 1,
  },
  text6: {
    position: 'absolute',
    color: '#5A6174',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: 5,
    right: 0,
    top: -30,
    bottom: 0,
    zIndex: 100,
    flex: 1,
  },
  text7: {
    position: 'absolute',
    color: '#5A6174',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: 20,
    right: 0,
    top: 490,
    bottom: 0,
    zIndex: -10,
  },
  avatar_01: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 20,
    right: 0,
    top: -135,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_02: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 90,
    right: 0,
    top: -135,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_03: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 160,
    right: 0,
    top: -135,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_04: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 230,
    right: 0,
    top: -135,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_05: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 20,
    right: 0,
    top: -70,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_06: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 90,
    right: 0,
    top: -70,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_07: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 160,
    right: 0,
    top: -70,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_08: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 230,
    right: 0,
    top: -70,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_09: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 20,
    right: 0,
    top: -5,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_10: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 90,
    right: 0,
    top: -5,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_11: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 160,
    right: 0,
    top: -5,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_12: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 230,
    right: 0,
    top: -5,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_13: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 20,
    right: 0,
    top: 60,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_14: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 90,
    right: 0,
    top: 60,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_15: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 160,
    right: 0,
    top: 60,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_16: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 230,
    right: 0,
    top: 60,
    bottom: 0,
    borderRadius: 50,
  },
  avatar_sam: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 20,
    right: 0,
    top: -135,
    bottom: 0,
  },
  avatar_add: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 90,
    right: 0,
    top: -135,
    bottom: 0,
  },
  close_button: {
    position: 'absolute',
    top: getStatusBarHeight() + 105,
    left: 0,
    zIndex: 200,
  },
  image2: {
    position: 'absolute',
    left: -60,
  },
  button: {
    backgroundColor: '#55B7DE',
    zIndex: 10,
    width: 80,
    height: 35,
    right: -100,
    borderRadius: 50,
  },
  button2: {
    backgroundColor: '#55B7DE',
    width: 120,
    height: 52,
    right: -100,
    borderRadius: 50,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text3: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    zIndex: -100,
  },
  position1: {
    position: 'absolute',
    left: 57,
    right: 0,
    top: -47,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  position2: {
    position: 'absolute',
    left: 82,
    right: 0,
    top: -145,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  position3: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 150,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  position5: {
    position: 'absolute',
    left: 82,
    right: 0,
    top: -290,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  position4: {
    position: 'absolute',
    left: 82,
    right: 0,
    top: 75,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -100,
  },
  background2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    width: 300,
    height: 275,
    margin: 0,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    elevation: 10,
    position: 'absolute',
    left: -150,
    right: 0,
    top: -50,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap2: {
    width: 300,
    height: 80,
    margin: 0,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    elevation: 10,
    position: 'absolute',
    left: -150,
    right: 0,
    top: 270,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image3: {
    position: 'absolute',
    left: 20,
    right: 0,
    top: 530,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    top: -150,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
