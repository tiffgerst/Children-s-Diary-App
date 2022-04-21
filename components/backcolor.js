import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

// eslint-disable-next-line react/prefer-stateless-function
class BackgroundButton extends React.Component {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const color = this.props.color
    if (color.length > 20) {
      return (
        <Image
          style={{
            flex: 0,
            flexDirection: 'column',
            width: 24,
            height: 24,
            marginHorizontal: 3,
            marginVertical: 3,
            borderRadius: 12,
          }}
          source={color}
        />
      )
    } else {
      return (
        <TouchableOpacity
          style={{
            flex: 0,
            flexDirection: 'column',
            width: 24,
            height: 24,
            marginHorizontal: 3,
            marginVertical: 3,
            borderRadius: 12,
            backgroundColor: color,
          }}
        ></TouchableOpacity>
      )
    }
  }
}

export default BackgroundButton
