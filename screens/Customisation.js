import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Animated, Dimensions, Text, FlatList, TouchableOpacity } from 'react-native' 
import theme from '../src/core/theme'
import Background3 from '../components/Background3'
import TextBox from '../components/TextBox'
import BackButton from '../components/BackButton'
import { getStatusBarHeight } from 'react-native-status-bar-height'



export default function Customisation({ navigation }) {
    const [animation, setAnimation]=useState(new Animated.Value(0));
    const {height} = Dimensions.get('window');

    const color = animation.interpolate({
        inputRange:[0, 0.2, 1.8, 2],
        outputRange:[
            'rgba(225, 255, 255, 0.0)',
            'rgba(45, 57, 82, 0.5)',
            'rgba(45, 57, 82, 0.8)',
            'rgba(225, 255, 255, 0.0)',
        ]
    })
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
            toValue:1,
            duration:500,
            useNativeDriver:false
        }).start();
    };
    const close=()=>{
        Animated.timing(animation, {
            toValue:0,
            duration:500,
            useNativeDriver:false
        }).start();
    };
    const save=()=>{
        Animated.timing(animation, {
            toValue:2,
            duration:500,
            useNativeDriver:false
        }).start(()=>{
            animation.setValue(0)
        });
    };
    const open = {
        transform:[
            {scale:openModal},
            {translateY:saveModal}
        ]
    };
    const background = {
        backgroundColor:color
    }


    return (
      <Background3 style={styles.background}>
        <BackButton goBack={navigation.goBack} />
        
        <Text style={styles.title}>Customisation</Text>
        <Text style={styles.text2}>Display Name</Text>
        <TextBox style={styles.textbox} label="Sam" />
        <Image source={require('../assets/line.png')} style={styles.line} />
        <Text style={styles.text4}>Avatar</Text>
        <Image source={require('../assets/squared_sam.png')} style={styles.image} />

        <View>
        <View>
        <TouchableOpacity style={[styles.button, styles.position2]} onPress={modalTrigger}>
            <Text style={styles.text3}>
                Change
            </Text>
        </TouchableOpacity>
        </View>

        <Animated.View style={[styles.background2, background]}>
        <Animated.View style={[open]}>

        <Image source={require('../assets/grey1.png')} style={styles.grey1} />
        <View style={[styles.wrap, styles.center]}>
            <Text style={styles.text5}>Choose Your Avatar</Text>
        </View>
        <View style={[styles.wrap2, styles.center]}>
            <Text style={styles.text6}>Custom Avatars</Text>
                <TouchableOpacity style={[styles.close_button]} onPress={close}>
                    <Image source={require('../assets/avatar_sam.png')} style={styles.avatar_sam} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.close_button]} onPress={close}>
                    <Image source={require('../assets/avatar_add.png')} style={styles.avatar_add} />
                </TouchableOpacity>
        </View>
        </Animated.View> 
        </Animated.View> 

        </View>
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
        position: 'absolute',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#5A6174',
        left: 75,
        right: 0,
        top: 50,
        bottom: 0,
        justifyContent:'center',
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
    textbox:{
        left: 0,
        right: 0,
        top: -240,
        bottom: 0,
        height: 40,
    },
    line:{
        width: 350,
        left: 0,
        right: 0,
        top: -210,
        bottom: 0,
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
        width: 150,
        height: 120,
        left: 20,
        top: 310,
    },
    grey1:{
        position: 'absolute',
        width: 343,
        height: 500,
        left: -172,
        right: 0,
        top: -128,
        bottom: 0,
        flex: 1, 
        zIndex: -100,
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
        flex:1,
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
        flex:1,
    },
    avatar_sam:{
        position: 'absolute',
        width: 50,
        height: 50,
        left: 20,
        right: 0,
        top: -135,
        bottom: 0,
    }, 
    avatar_add:{
        position: 'absolute',
        width: 50,
        height: 50,
        left: 85,
        right: 0,
        top: -135,
        bottom: 0,
    }, 
    close_button:{
        position: 'absolute',
        top: getStatusBarHeight()+105,
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
        right:-100,
        borderRadius: 50,
    },
    button2: {
        backgroundColor: '#55B7DE',
        width: 120,
        height: 52,
        right:-100,
        borderRadius: 50,
    },
    center:{
        justifyContent:'center',
        alignItems: 'center',
    },
    text3: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    }, 
    position1:{
        position: 'absolute',
        left: 57,
        right: 0,
        top: -47,
        bottom: 0,
        justifyContent:'center',
        alignItems: 'center',
    },
    position2:{
        position: 'absolute',
        left: 82,
        right: 0,
        top: -145,
        bottom: 0,
        justifyContent:'center',
        alignItems: 'center'
    },
    position3:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 150,
        bottom: 0,
        justifyContent:'center',
        alignItems: 'center'
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
    wrap:{
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
        justifyContent:'center',
        alignItems: 'center'
    },
    wrap2:{
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
        justifyContent:'center',
        alignItems: 'center'
    },
    image3: {
        width: 250,
        height: 250,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        justifyContent:'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        top: -150,
    },
    container:{
        flex: 1,
        backgroundColor: "white",
    },
})