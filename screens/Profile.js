import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Switch,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import theme from '../src/core/theme'
import Background3 from '../components/Background3'
import BackButton from '../components/BackButton'
import Button2 from '../components/Button2'
import Button from '../components/Button'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'

export default function Profile({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(true)
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
  return (
    <Background3 style={styles.background}>
      <BackButton goBack={navigation.goBack} />
      <Image source={require('../assets/sam.png')} style={styles.image} />
      <View>
        <Text style={styles.title}>Sam</Text>
      </View>
      <Image
        source={require('../assets/stars.png')}
        style={styles.small_image}
      />

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
  image: {
    marginTop: 80,
    width: '80%',
    overflow: 'visible',
    marginBottom: 10,
    shadowColor: '#4048BF',
    shadowOffset: {
      width: 5.4,
      height: 5.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 20,
    elevation: 10,
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
    marginBottom: 25,
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
    color: '#FFFFFF',
    fontWeight: 'bold',
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
})
