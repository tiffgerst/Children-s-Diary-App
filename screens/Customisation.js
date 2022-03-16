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
        
        <View>
          <Text style={styles.title}>Customisation</Text>
        </View>
        <Text style={styles.text2}>Display Name</Text>
        <TextBox label="Sam" />
        <Image source={require('../assets/line.png')} style={styles.line} />
        <Text style={styles.text2}>Avatar</Text>
        <Image source={require('../assets/squared_sam.png')} style={styles.image} />
        <View>
        <TouchableOpacity style={[styles.button, styles.position2]} onPress={()=>console.log('react')}>
            <Text style={styles.text3}>
                Change
            </Text>
        </TouchableOpacity>
        </View>

        <Image source={require('../assets/line.png')} style={styles.line} />

        <Text style={styles.text2}>Mood Icons</Text>
        <Image source={require('../assets/moods.png')} style={styles.image2} />
    
        <View>
        <View>
        <TouchableOpacity style={[styles.button, styles.position1]} onPress={modalTrigger}>
            <Text style={styles.text3}>
                Change
            </Text>
        </TouchableOpacity>
        </View>

        <Animated.View style={[styles.background2, background]}>
        <Animated.View style={[open]}>

        <View style={[styles.wrap, styles.center]}>
            <Text style={styles.text}>Customise Your Emojis</Text>
            <Image source={require('../assets/9emoji.png')} style={styles.image3} />
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={[styles.button2, styles.position3]} onPress={close}>
                    <Text style={styles.text3}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button2, styles.position3]} onPress={save}>
                    <Text style={styles.text3}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 30,
        fontWeight: 'bold',
        color: '#5A6174',
        marginBottom: -50,
        marginTop: -120,
        alignSelf: 'center',
        paddingBottom: 10,
    },
    text2: {
        color: '#5A6174',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginTop:10,
        marginBottom: 5,
    }, 
    line:{
        marginVertical:20,
    },
    image: {
        width: 150,
        height: 120,
        marginTop: 10,
        left: -80,
        marginBottom: 10,
    },
    image2: {
        marginTop: 10,
        left: -60,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#55B7DE',
        zIndex: 10,
        width: 80,
        height: 35,
        right:-100,
        marginTop: 0,
        borderRadius: 50,
    },
    button2: {
        backgroundColor: '#55B7DE',
        width: 120,
        height: 52,
        right:-100,
        marginTop: 0,
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
        alignItems: 'center'
    },
    position2:{
        position: 'absolute',
        left: 57,
        right: 0,
        top: -130,
        bottom: 0,
        justifyContent:'center',
        alignItems: 'center'
    },
    position3:{
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
        height: 400,
        margin: 0,
        borderRadius: 8,
        backgroundColor: '#E5E5E5',
        elevation: 10,
        position: 'absolute',
        left: -150,
        right: 0,
        top: -420,
        bottom: 0,
        justifyContent:'center',
        alignItems: 'center'
    },
    image3: {
        width: 250,
        height: 250,
        marginTop: 70,
        marginLeft: 25,
        marginBottom: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
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