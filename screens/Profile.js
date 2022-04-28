import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import {
  StyleSheet,
  Image,
  View,
  Switch,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
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
import { showMessage, hideMessage } from 'react-native-flash-message'

export default function Profile({ navigation }) {
  const [userID, setUserID] = useState(null)
  const [postData, setPostData] = useState()
  const [isEnabled, setIsEnabled] = useState(true)
  const [avatarID, setAvatarID] = useState(null)
  const [avatarURL, setAvatarURL] = useState(null)
  const [stars, setStars] = useState(null)
  const [achievementStatus, setAchievementStatus] = useState(null)
  const ip = add.ip
  const [modalVisibleAchievement, setModalVisibleAchievement] = useState(true)
  const [modalVisible1, setModal1Visible] = useState('')
  const [modalVisible2, setModal2Visible] = useState('')
  const [modalVisible3, setModal3Visible] = useState('')
  const [modalVisible4, setModal4Visible] = useState('')
  const [modalVisible5, setModal5Visible] = useState('')
  const [animation, setAnimation]=useState(new Animated.Value(0))
  const {height} = Dimensions.get('window')
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token')
      await SecureStore.deleteItemAsync('userID')
      navigation.navigate('StartScreen')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const getData = async () => {
      const userID = await SecureStore.getItemAsync('userID')
      const apiResponse = await fetch(`http://${ip}:3000/appUser/getUser/` + userID)
      const data = await apiResponse.json()
      const display_name = data[0].displayname
      const avatarID = data[0].avatarID
      setUserID(userID)
      setPostData(display_name)
      setAvatarID(avatarID)
      const URL = await fetch(`http://${ip}:3000/avatar/getAvatarURL/` + avatarID)
      const avatarinfo = await URL.json()
      const avatarURL = avatarinfo[0].avatarURL
      setAvatarURL(avatarURL)
      const reward = await fetch(`http://${ip}:3000/appUser/reward/getReward/` + userID)
      const rewardinfo = await reward.json()
      const stars = rewardinfo[0].reward
      setStars(stars)
      const getAchievement = await fetch(`http://${ip}:3000/appUser/achievementOn/` + userID)
      const achievementinfo = await getAchievement.json()
      const achievementStatus = achievementinfo[0].achievementOn
      setAchievementStatus(achievementStatus)
      if (achievementStatus == 0){
        setIsEnabled((previousState) => !previousState)
        setModalVisibleAchievement((previousState) => !previousState)
      }
      console.log(achievementStatus)
    }
    getData()
  }, [])

  const updateAchievement = (achievementStatus) => {
    setIsEnabled((previousState) => !previousState)
    setModalVisibleAchievement((previousState) => !previousState)
    axios
        .patch(`http://${ip}:3000/appUser/achievementOn/update/` + userID, {
          id: userID,
          choice: achievementStatus,
        })
        .catch((error) => {
            console.log(error)
        })
    showMessage({
        message: 'You have changed your achievement setting. Please refresh the page to reflect the change.',
        type: 'info',
        duration: '3000',
        floating: true,
        backgroundColor: '#7AC9A1',
        titleStyle: { fontWeight: 'bold', textAlign: 'center' },
        animationDuration: '275',
    })
  }
  const openModal = animation.interpolate({
    inputRange:[0, 1],
    outputRange:[0, 1],
    extrapolate: 'clamp',
  });
  const saveModal = animation.interpolate({
    inputRange:[1, 2],
    outputRange:[0, -height],
    extrapolate: 'clamp',
  });
  const modalTrigger = () =>{
    Animated.timing(animation, {
        toValue:0,
        duration:500,
        useNativeDriver:false
    }).start();
  };
  const close = () => {
    Animated.timing(animation, {
        toValue:0,
        duration:500,
        useNativeDriver:false
    }).start();
  };
  const open = {
    transform:[
        {scale:openModal},
        {translateY:saveModal}
    ]
  };
  const color = animation.interpolate({
    inputRange:[0, 0.2, 1.8, 2],
    outputRange:[
        'rgba(225, 255, 255, 0.0)',
        'rgba(45, 57, 82, 0.5)',
        'rgba(45, 57, 82, 0.8)',
        'rgba(225, 255, 255, 0.0)',
    ]
  })
  const background = {
    backgroundColor:color
  }

  if (modalVisibleAchievement) {
  return (
    <Background3 style={styles.background}>
      <BackButton goBack={navigation.goBack}/>
      
      <Image source={{uri: avatarURL}} style={styles.image}/>
      <Text style={styles.title}>{postData}</Text>

      {/* <View>
      <View style={styles.wrap3}>
        <Text> 1 </Text>
      </View>
      </View> */}


        <View style={styles.wrap}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/Star.png')} style={styles.small_image}/>
            <Text style={styles.text}> {stars} </Text>
          </View>
        </View>

      <Text style={styles.text2}>Achievements</Text>

      <View style={styles.container}>
        <Switch
          trackColor={{ false: '#FFFFFF', true: '#7AC9A1' }}
          thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={updateAchievement}
          value={isEnabled}
        />
      </View>

      <View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {setModal1Visible(!modalVisible1)}}>
          <Image source={require('../assets/reward5.png')} style={styles.image2}/>
        </TouchableOpacity>

        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible1}
            onBackdropPress={() => setModal1Visible(!modalVisible1)}
          >
            <View style={styles.wrap2}>
              <Text style={styles.text3}> Earn this achievement by getting 5 stars! </Text>
            </View>
          </Modal>
        </View>

        <TouchableOpacity onPress={() => {setModal2Visible(!modalVisible2)}}>
          <Image source={require('../assets/reward4.png')} style={styles.image2}/>
        </TouchableOpacity>

        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible2}
            onBackdropPress={() => setModal2Visible(!modalVisible2)}
          >
            <View style={[styles.wrap2, styles.achievement2]}>
              <Text style={styles.text3}> Earn this achievement by getting 20 stars! </Text>
            </View>
          </Modal>
        </View>

        <TouchableOpacity onPress={() => {setModal3Visible(!modalVisible3)}}>
          <Image source={require('../assets/reward3.png')} style={styles.image2}/>
        </TouchableOpacity>

        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible3}
            onBackdropPress={() => setModal3Visible(!modalVisible3)}
          >
            <View style={[styles.wrap2, styles.achievement3]}>
              <Text style={styles.text3}> Earn this achievement by getting 50 stars! </Text>
            </View>
          </Modal>
        </View>

        <TouchableOpacity onPress={() => {setModal4Visible(!modalVisible4)}}>
          <Image source={require('../assets/reward2.png')} style={styles.image2}/>
        </TouchableOpacity>

        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible4}
            onBackdropPress={() => setModal4Visible(!modalVisible4)}
          >
            <View style={[styles.wrap2, styles.achievement4]}>
              <Text style={styles.text3}> Earn this achievement by getting 100 stars! </Text>
            </View>
          </Modal>
        </View>

        <TouchableOpacity onPress={() => {setModal5Visible(!modalVisible5)}}>
          <Image source={require('../assets/reward1.png')} style={styles.image2}/>
        </TouchableOpacity>

        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible5}
            onBackdropPress={() => setModal5Visible(!modalVisible5)}
          >
            <View style={[styles.wrap2, styles.achievement5]}>
              <Text style={styles.text3}> Earn this achievement by getting 200 stars! </Text>
            </View>
          </Modal>
        </View>
      <View>
      
      </View>
      </View>
      </View>

      <Button2
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Customisation')}
      >
        Customisation
      </Button2>
      <Button2
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Message')}
      >
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
  else {
    return (
      <Background3 style={styles.background}>
        <BackButton goBack={navigation.goBack}/>
        
        <Image source={{uri: avatarURL}} style={styles.image}/>
        <Text style={styles.title}>{postData}</Text>
  
        <Text style={styles.text2}>Achievements</Text>
  
        <View style={styles.container}>
          <Switch
            trackColor={{ false: '#FFFFFF', true: '#7AC9A1' }}
            thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={updateAchievement}
            value={isEnabled}
          />
        </View>
  
        <Button2
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('Customisation')}
        >
          Customisation
        </Button2>
        <Button2
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('Message')}
        >
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
  image_border:{
    borderRadius: 80,
  },
  image_shadow:{
    shadowColor: '#4048BF',
    shadowOffset: {
      width: 5.4,
      height: 5.4,},
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
      height: 5.4,},
    shadowOpacity: 0.74,
    shadowRadius: 20,
  },
  image2: {
    marginTop: -10,
    overflow: 'visible',
    marginBottom: 10,
    width: 61,
    height: 62,
    top: -20,
    marginLeft: 5
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
    marginTop: 7
  },
  text2: {
    color: '#5A6174',
    fontSize: 18,
    fontWeight: 'bold',
    left: -100,
    marginBottom: -10,
  },
  text3: {
    color: '#5A6174',
    fontSize: 15,
    lineHeight: 26,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    right: -130,
    marginVertical: -15,
  },
  wrap:{
    width: 82,
    height: 36,
    margin: 0,
    borderRadius: 5,
    backgroundColor: '#EEEEEE',
    elevation: 10,
    justifyContent:'center',
    alignItems: 'center',
    marginTop:10,
    marginBottom:20
  },
  wrap2:{
    width: 180,
    height: 90,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    elevation: 10,
    justifyContent:'center',
    alignItems: 'center',
    marginTop:10,
    marginBottom:20,
    top: 150,
    shadowColor: '#8f8d8d',
    shadowOffset: {
      width: 8,
      height: 8,},
    shadowOpacity: 0.74,
    shadowRadius: 180,
  },
  achievement2:{
    left: 30
  },
  achievement3:{
    left: 90
  },
  achievement4:{
    left: 140
  },
  achievement5:{
    left: 170
  },
  white1:{
    position: 'absolute',
    width: 100,
    height: 50,
    left: 120,
    top: 350,
    zIndex: 10,
  },
  wrap3:{
    position: 'absolute',
    width: 100,
    height: 50,
    left: -50,
    top: 0,
    zIndex: 100,
    backgroundColor: '#eb1515',
    elevation: 10,
    justifyContent:'center',
    alignItems: 'center',
  },
  background2:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent:'center',
    alignItems: 'center'
  },
})