import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
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
    if (item === 'Social Worker') {
      return styles.socialWorker
    }
    if (item === 'Feelings') {
      return styles.feelings
    }
    if (item === 'School') {
      return styles.school
    }
    if (item === 'Holiday') {
      return styles.holiday
    }
    if (item === 'Food') {
      return styles.food
    }
    if (item === 'Shopping') {
      return styles.shopping
    }
    if (item === 'Travel') {
      return styles.travel
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
          renderItem={({ item }) => (
            <TagButton
              style={[styles.tag, getColor({ item })]}
              mode="contained"
            >
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
    width: '102%',
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
  socialWorker: {
    backgroundColor: '#F9C978',
  },
  feelings: {
    backgroundColor: '#FFD00D',
  },
  school: {
    backgroundColor: '#5993C1',
  },
  holiday: {
    backgroundColor: '#A3CB8B',
  },
  food: {
    backgroundColor: '#EAAC9D',
  },
  shopping: {
    backgroundColor: '#CEB9EF',
  },
  travel: {
    backgroundColor: '#B4CC56',
  },
})
