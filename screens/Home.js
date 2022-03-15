import React, { useState, useEffect } from 'react'
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
import CalendarButton from '../components/CalendarButton'
import ProfileButton from '../components/ProfileButton'
import SearchBar from '../components/SearchBar'
import SearchBarList from '../components/SearchBarList'
import JournalFeed from '../components/JournalFeed'
import AddButton from '../components/AddButton'

const postData = [
  {
    postId: 1,
    journalDate: '30 Aug 2021',
    journalTitle: '3 Good things for today',
    journalText: 'It could be anything from hanging out with friends...',
    journalTag: 'Sports',
  },
  {
    postId: 2,
    journalDate: '31 Mar 2021',
    journalTitle: 'My feelings',
    journalText: 'I feel excited and calm.',
    journalTag: 'Sports',
  },
  {
    postId: 3,
    journalDate: '26 Mar 2021',
    journalTitle: 'Vacation',
    journalText: 'Summer is the warmest of the four seasons. Spring',
    journalTag: 'Friends',
  },
  {
    postId: 4,
    journalDate: '20 Mar 2021',
    journalTitle: 'My lovely dogge',
    journalText: 'Had this dog around growing up',
    journalImage: require('../assets/journal_image_example.png'),
    journalTag: 'Family',
  },
]

export default function Home({ navigation }) {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [fakeData, setFakeData] = useState()

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
    // backgroundColor: theme.colors.tint,
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
  // search: {
  //   flex: 1,
  //   position: 'relative',
  //   // top: 30 + getStatusBarHeight(),
  //   lineHeight: 1 ,
  //   right: 4,
  // },
  // SearchContainer: {
  //   flex: 1,
  //   position: 'relative',
  //   top: 60 + getStatusBarHeight(),
  //   right: 4,
  //   width:'100%',
  //   height: '10%',
  // },
  scroll: {
    top: 62 + getStatusBarHeight(),
    minWidth: '125%',
  },
})
