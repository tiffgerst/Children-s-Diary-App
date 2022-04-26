import React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'

export default function MoodIconList({ data }) {
  return (
    <View style={styles.tagContainerView}>
      <Text>
        <FlatList
          contentContainerStyle={styles.tagList}
          data={data}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Image style={styles.image} source={{url:item}}/>
          )}
          scrollEnabled={false}
        />
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tagContainerView: {
    alignSelf: 'center',
    paddingTop: 5,
    width: '102%',
    height: 50,
  },
  tagList: {
    alignSelf: 'flex-end',
  },
  image: {
    width: 35,
    height: 35,
    top: 2,
    marginLeft: 14,
    marginBottom: 4
  },
})
