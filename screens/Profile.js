import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Switch,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native'
import theme from '../src/core/theme'
import Background3 from '../components/Background3'
import BackButton from '../components/BackButton'
import Button2 from '../components/Button2'
import Button from '../components/Button'
import SearchBarList from '../components/SearchBarList'
import * as SecureStore from 'expo-secure-store'
import * as add from '../ip/config'
import axios from 'axios'

export default function Profile({ navigation }) {
  const [userID, setUserID] = useState(null)
  const [postData, setPostData] = useState()
  const [isEnabled, setIsEnabled] = useState(true)
  const [avatarID, setAvatarID] = useState(true)
  const [avatarURL, setAvatarURL] = useState(true)
  const ip = add.ip

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token')
      await SecureStore.deleteItemAsync('userID')
      navigation.navigate('StartScreen')
    } catch (error) {
      console.log(error)
    }
  }
  const email = async () => {
    const userID = await SecureStore.getItemAsync('userID')
    axios
      .post(`http://${ip}:3000/appUser/email`, {
        userID: userID,
      })
      .then(async (response) => {
        const mail = response.data
        console.log(mail)
        Linking.openURL(`mailto:${mail}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    const getData = async () => {
      const userID = await SecureStore.getItemAsync('userID')
      const apiResponse = await fetch(
        `http://${ip}:3000/appUser/getUser/` + userID
      )
      const data = await apiResponse.json()
      const display_name = data[0].displayname
      const avatarID = data[0].avatarID
      setUserID(userID)
      setPostData(display_name)
      setAvatarID(avatarID)
      const URL = await fetch(
        `http://${ip}:3000/avatar/getAvatarURL/` + avatarID
      )
      const avatarinfo = await URL.json()
      const avatarURL = avatarinfo[0].avatarURL
      setAvatarURL(avatarURL)
      const reward = await fetch(
        `http://${ip}:3000/appUser/reward/getReward/` + userID
      )
      const rewardinfo = await reward.json()
      const stars = rewardinfo[0].reward
      setStars(stars)
      console.log(stars)
    }
    getData()
  }, [])

  return (
    <Background3 style={styles.background}>
      <BackButton goBack={navigation.goBack} />

      <Image source={{ uri: avatarURL }} style={styles.image} />

      <Text style={styles.title}>{postData}</Text>
      <View style={styles.wrap}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../assets/Star.png')}
            style={styles.small_image}
          />
          <Text style={styles.text}> {stars} </Text>
        </View>
      </View>

      <Text style={styles.text2}>Achievements</Text>

      <View style={styles.container}>
        <Switch
          trackColor={{ false: '#FFFFFF', true: '#7AC9A1' }}
          thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Image
        source={require('../assets/achievements.png')}
        style={styles.image2}
      />

      <Button2
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Customisation')}
      >
        Customisation
      </Button2>
      <Button2 style={styles.button} mode="contained" onPress={() => email()}>
        Message my social worker
      </Button2>
      <Button2
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Contact')}
      >
        Contact Child Line
      </Button2>

      <Button2
        style={styles.button_logout}
        mode="contained"
        onPress={() => handleLogout()}
      >
        <Text style={styles.text}>Logout</Text>
      </Button2>
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
  image_border: {
    borderRadius: 80,
  },
  image_shadow: {
    shadowColor: '#4048BF',
    shadowOffset: {
      width: 5.4,
      height: 5.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 20,
  },
  image: {
    marginTop: 90,
    width: '65%',
    height: '22%',
    overflow: 'visible',
    marginBottom: 30,
    shadowColor: '#4048BF',
    shadowOffset: {
      width: 5.4,
      height: 5.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 20,
  },
  image2: {
    marginTop: 10,
    width: '80%',
    overflow: 'visible',
    marginBottom: 10,
  },
  small_image: {
    marginTop: 10,
    width: '25%',
    overflow: 'visible',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#EEEEEE',
    width: '100%',
    marginTop: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
  button_logout: {
    backgroundColor: '#FF7884',
    width: '100%',
    marginTop: 20,
    marginBottom: 70,
    paddingVertical: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: '#5A6174',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 7,
  },
  text2: {
    color: '#5A6174',
    fontSize: 18,
    fontWeight: 'bold',
    left: -100,
    marginBottom: -10,
  },
  container: {
    flex: 1,
    right: -130,
    marginVertical: -15,
  },
  wrap: {
    width: 82,
    height: 36,
    margin: 0,
    borderRadius: 5,
    backgroundColor: '#EEEEEE',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
})
