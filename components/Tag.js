import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

export default function Tag({ name, onPress, onPressOut, bool }) {
  const [isPressed, setisPressed] = useState(bool)
  const setcolour = () => {
    if (!isPressed) {
      setisPressed(true)
    } else {
      setisPressed(false)
    }
  }
  // eslint-disable-next-line react/destructuring-assignment

  const getColor = (name) => {
    if (name === 'Family') {
      return '#65A4D9'
    }
    if (name === 'Friends') {
      return '#F78B45'
    }
    if (name === 'Sports') {
      return '#8FD1CD'
    }
    if (name === 'Dreams') {
      return '#92A2EE'
    }
    if (name === 'Social Worker') {
      return '#F9C978'
    }
    if (name === 'Feelings') {
      return '#FFD00D'
    }
    if (name === 'School') {
      return '#5993C1'
    }
    if (name === 'Holiday') {
      return '#A3CB8B'
    }
    if (name === 'Food') {
      return '#EAAC9D'
    }
    if (name === 'Shopping') {
      return '#CEB9EF'
    }
    if (name === 'Travel') {
      return '#B4CC56'
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setcolour()}
      style={[
        styles.button,
        isPressed
          ? { backgroundColor: getColor(name) }
          : { backgroundColor: '#ffe6ff' },
        { borderColor: getColor(name) },
      ]}
    >
      <Text
        style={[
          styles.text,
          isPressed ? { color: 'white' } : { color: getColor(name) },
          { borderColor: getColor(name) },
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    margin: 4,
  },
  text: { fontSize: 11, fontWeight: 'bold', lineHeight: 11, padding: 4 },
})
