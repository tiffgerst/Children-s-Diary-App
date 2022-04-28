import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import * as SecureStore from 'expo-secure-store'
import { theme } from '../src/core/theme'
import Background3 from '../components/Background3'
import SearchBar from '../components/SearchBar'
import SearchBarList from '../components/SearchBarList'
import AddButton from '../components/AddButton'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'
import * as add from '../ip/config'

//import { isLoggedIn } from '../helpers/isLoggedIn'

export default function Home({ navigation }) {
  const [avatarID, setAvatarID] = useState(null)
  const [avatarURL, setAvatarURL] = useState(null)
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [postData, setPostData] = useState('')

  // // get post data from api
  // useEffect(() => {
  //   const getData = async () => {
  //     const userID = await SecureStore.getItemAsync('userID')
  //     const apiResponse = await fetch(
  //       `https://mirradiaryapp.azurewebsites.net/post/all/${userID}`
  //     )
  //     const data = await apiResponse.json()
  //     const sorted = data.sort((a, b) => b.postID - a.postID)
  //     setPostData(sorted)
  //     console.log(postData)
  //   }
  //   getData()
  //   console.log(postData)
  // }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const ip = add.ip
      // get post data from api
      const getData = async () => {
        const userID = await SecureStore.getItemAsync('userID')
        const apiResponse = await fetch(`http://${ip}:3000/post/all/${userID}`)
        const data = await apiResponse.json()
        const sorted = data.sort((a, b) => b.postID - a.postID)
        setPostData(sorted)
        const appUserResponse = await fetch(`http://${ip}:3000/appUser/getUser/` + userID)
        const appUserdata = await appUserResponse.json()
        const avatarID = appUserdata[0].avatarID
        setAvatarID(avatarID)
        const URL = await fetch(`http://${ip}:3000/avatar/getAvatarURL/` + avatarID)
        const avatarinfo = await URL.json()
        const avatarURL = avatarinfo[0].avatarURL
        setAvatarURL(avatarURL)
        //console.log(postData)
      }
      getData()
      console.log(postData)
    })
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [])

  return (
    <Background3 style={styles.background}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Calendar')}
        style={styles.calendar}
      >
        <Image source={require('../assets/calendar_button.png')} />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>Journal</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.profile}
      >
        <Image source={{uri: avatarURL}} style={styles.profile_image}/>
      </TouchableOpacity>
      <Image source={{uri: avatarURL}} style={styles.profile1}/>
      {!clicked}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <View style={styles.scroll}>
        <SearchBarList
          searchPhrase={searchPhrase}
          data={postData}
          setClicked={setClicked}
          navigation={navigation}
        />
      </View>
      <AddButton
        style={styles.bottom_left}
        mode="contained"
        onPress={() => navigation.navigate('NewEntry')}
      >
        +
      </AddButton>
    </Background3>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    top: 40 + getStatusBarHeight(),
  },
  calendar: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  profile: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    right: 4,
  },
  scroll: {
    top: 62 + getStatusBarHeight(),
    minWidth: '125%',
  },
  profile_image: {
    width: 33,
    height: 34,
    borderRadius: 20
  },
})
