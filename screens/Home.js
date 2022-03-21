import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { theme } from '../src/core/theme'
import Background3 from '../components/Background3'
import SearchBar from '../components/SearchBar'
import SearchBarList from '../components/SearchBarList'
import JournalFeed from '../components/JournalFeed'
import AddButton from '../components/AddButton'

// const postData = [
//   {
//     postID: 1,
//     createDateTime: '30 Aug 2021',
//     titleText: '3 Good things for today',
//     contentText: 'It could be anything from hanging out with friends...',
//     // imageURL: '',
//     // tagNameAll: 'Sports',
//   },
//   {
//     postID: 2,
//     createDateTime: '31 Mar 2021',
//     titleText: 'My feelings',
//     contentText: 'I feel excited and calm.',
//     // journalTag: 'Sports',
//   },
//   {
//     postID: 3,
//     createDateTime: '26 Mar 2021',
//     titleText: 'Vacation',
//     contentText: 'Summer is the warmest of the four seasons. Spring',
//     // journalTag: 'Friends',
//   },
//   {
//     postID: 4,
//     createDateTime: '20 Mar 2021',
//     titleText: 'My lovely dogge',
//     contentText: 'Had this dog around growing up',
//     imageURL: 'https://csb100320016de6b123.blob.core.windows.net/post-image/doggie.png?sp=r&st=2022-03-20T03:11:07Z&se=2022-04-30T10:11:07Z&spr=https&sv=2020-08-04&sr=b&sig=2ngZyIk6E2ttC51zpIs8qDtYr3bj5J9uskoKOi1ZfE8%3D',
//     // journalTag: 'Family',
//   },
// ]

export default function Home({ navigation }) {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [postData, setPostData] = useState()
  
  // get post data from api
  useEffect(() => {
    const getData = async () => {
      const userID = '1'
      const apiResponse = await fetch(
        "http://172.21.9.18:3000/post/all/" + userID
      );
      const data = await apiResponse.json();
      setPostData(data);
    };
    getData();
  }, []);

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
        <Image source={require('../assets/profile_button.png')} />
      </TouchableOpacity>
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
})
