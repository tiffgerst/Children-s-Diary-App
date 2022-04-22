import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { theme } from '../src/core/theme'
import TagButton from '../components/TagButton'

class JournalFeed extends React.Component {
  render() {
    const { journalDate, journalTitle, journalText, journalImage, journalTag } =
      this.props.journalTitle
    return (
      <View style={styles.container}>
        <Text style={styles.date}>{journalDate}</Text>
        <Text style={styles.title}>{journalTitle}</Text>
        <Image style={styles.image} source={journalImage} />
        <Text style={styles.text} numberOfLines={1}>
          {journalText}
        </Text>
        <TagButton style={styles.tag} mode="contained">
          {journalTag}
        </TagButton>
        <Text style={{ paddingBottom: 10 }} />
      </View>
    )
  }
}

export default JournalFeed

const styles = StyleSheet.create({
  container: {
    width: '99%',
    alignSelf: 'center',
    marginHorizontal: 5,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: theme.colors.tint,
    borderWidth: 3,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.25,
  },
  date: {
    fontSize: 13,
    color: '#5A6174',
    padding: 1,
    top: 8,
    right: 10,
    alignSelf: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    color: '#5A6174',
    padding: 1,
    left: 10,
  },
  text: {
    fontSize: 13,
    color: '#5A6174',
    width: '95%',
    padding: 1,
    top: 5,
    left: 10,
  },
  image: {
    width: '95%',
    alignSelf: 'center',
    top: 2,
    borderRadius: 12,
  },
  tag: {
    top: 15,
    left: 10,
  },
})
