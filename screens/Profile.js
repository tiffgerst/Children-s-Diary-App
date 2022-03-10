import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, FlatList, TouchableOpacity } from 'react-native' 
import theme from '../src/core/theme'
import Background3 from '../components/Background3'
import BackButton from '../components/BackButton'
import Button2 from '../components/Button2'



export default function Profile({ navigation }) {
    return (
      <Background3 style={styles.background}>
        <BackButton goBack={navigation.goBack} />
        <Image source={require('../assets/sam.png')} style={styles.image} />
        <View>
        <Text style={styles.title}>Sam</Text>
        </View>
        <Image source={require('../assets/stars.png')} style={styles.small_image} />
        <Image source={require('../assets/achievements.png')} style={styles.image} />

        <Button2
            style={styles.button} mode="contained"
            onPress={() => navigation.navigate('Customisation')}
            >
            Customisation
        </Button2>
        <Button2
            style={styles.button} mode="contained"
            onPress={() => navigation.navigate('Message')}
            >
            Message my social worker
        </Button2>
        <Button2
            style={styles.button} mode="contained"
            onPress={() => navigation.navigate('Contact')}
            >
            Contact Child Line
        </Button2>

        <Button2
            style={styles.button_logout} mode="contained"
            onPress={() => navigation.navigate('StartScreen')}
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
        marginTop: 15,
        width: '90%',
        overflow: 'visible',
        marginBottom: 15,
    },
    small_image:{
        marginTop: 15,
        width: '30%',
        overflow: 'visible',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#EEEEEE',
        width: '100%',
        marginVertical: 0,
        paddingVertical: 2,
        borderRadius: 10,
    },
    button_logout: {
        backgroundColor: '#FF7884',
        width: '100%',
        marginVertical: 20,
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
})