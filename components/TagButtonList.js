import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native'
import TagButton from './TagButton'

export default function TagButtonList({ data }) {
  const getColor = ({ item }) => {
    if (item === 'Family') {
        return styles.family
    }
    if (item === 'Friends') {
        return styles.friends
    }
    if (item === 'Sports') {
        return styles.sports
    }
    if (item === 'Dreams') {
        return styles.dreams
    }
  }
  return (
    <View style={styles.tagContainerView}>
      <Text>
        　<FlatList
            contentContainerStyle={styles.tagList}
            data={data}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({item}) => (
              <TagButton style={[styles.tag, getColor({item})]} mode="contained">
                {item}
              </TagButton>
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
    width:'102%',
  },
  tagList: {
    alignSelf: 'flex-end',
  },
  tag: {
    marginRight: 6,
  },
  family: {
    backgroundColor: '#65A4D9',
  },
  friends: {
    backgroundColor: '#F78B45',
  },
  sports: {
    backgroundColor: '#8FD1CD',
  },
  dreams: {
    backgroundColor: '#92A2EE',
  },
})
