import React from 'react'
import { View, Text, Image } from 'react-native'

// eslint-disable-next-line react/prefer-stateless-function
class Emoji extends React.Component {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { emotion, emoji } = this.props.emotion
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'column',
          width: 95,
          height: 90,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 3,
          marginVertical: 3,
          borderRadius: 20,
          backgroundColor: '#F2F2F2',
          borderWidth: 0.5,
          borderColor: '#ddd',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1.5 },
          shadowOpacity: 0.25,
          shadowRadius: 1.5,
          elevation: 1,
          padding: 7.5,
        }}
      >
        <Image
          // eslint-disable-next-line react/destructuring-assignment
          source={emoji}
          style={{
            width: 37,
            height: 37,
            marginBottom: 5,
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            color: '#5A6174',
          }}
        >
          {emotion}
        </Text>
      </View>
    )
  }
}

export default Emoji
