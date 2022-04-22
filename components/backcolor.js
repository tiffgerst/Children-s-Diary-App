import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

// eslint-disable-next-line react/prefer-stateless-function
class BackgroundButton extends React.Component {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const color = this.props.color
    const onPress = this.props.onPress
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 0,
          flexDirection: 'column',
          width: 24,
          height: 24,
          marginHorizontal: 15,
          marginVertical: 7,
          borderRadius: 12,
          backgroundColor: color,
          borderWidth: 0.5,
          borderColor: '#ddd',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1.5 },
          shadowOpacity: 0.25,
          shadowRadius: 1.5,
          elevation: 1,
          padding: 7.5,
        }}
      ></TouchableOpacity>
    )
  }
}

export default BackgroundButton
