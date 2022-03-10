import React, { useState } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { theme } from '../src/core/theme'
import Background3 from '../components/Background3'
import BackButton from '../components/BackButton'
import JournalFeed from '../components/JournalFeed'

const postData = [
  {
    postId: 1,
    journalDate: '30 Aug 2021',
    journalTitle: '3 Good things for today',
    journalText: 'It could be anything from hanging out with friends...',
    journalTag: 'Sports',
  },
  {
    postId: 2,
    journalDate: '31 Mar 2021',
    journalTitle: 'My feelings',
    journalText: 'I feel excited and calm.',
    journalTag: '',
  },
  {
    postId: 3,
    journalDate: '26 Mar 2021',
    journalTitle: 'Vacation',
    journalText: 'Summer is the warmest of the four seasons. Spring',
    journalTag: 'Friends',
  },
  {
    postId: 4,
    journalDate: '20 Mar 2021',
    journalTitle: 'My lovely dogge',
    journalText: 'Had this dog around growing up',
    journalImage: require('../assets/journal_image_example.png'),
    journalTag: 'Family',
  },
]

export default function CalendarScreen({ navigation }) {
  return (
    <Background3 style={styles.background}>
      <BackButton goBack={navigation.goBack} />
      <View>
        <Text style={styles.title}>Calendar</Text>
      </View>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: theme.colors.tint,
          calendarBackground: theme.colors.tint,
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: theme.colors.secondary,
          disabledArrowColor: '#d9e1e8',
          monthTextColor: theme.colors.secondary,
          indicatorColor: theme.colors.secondary,
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
        }}
        // // onDayPress={}
        //   markingType={'custom'}
        //   markedDates
      />
      <Text style={styles.entry}>Entries</Text>
      <View style={styles.scroll}>
        <FlatList
          contentContainerStyle={styles.grid}
          data={postData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <JournalFeed journalTitle={item} />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Background3>
  )
}

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    width: '90%',
    height: '90%',
    // backgroundColor: theme.colors.tint,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    top: getStatusBarHeight(),
  },
  calendar: {
    backgroundColor: theme.colors.tint,
    width: 320,
    height: 430,
    top: 40 + getStatusBarHeight(),
  },
  entry: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    top: 450 + getStatusBarHeight(),
    left: 12,
    color: theme.colors.secondary,
  },
  scroll: {
    flex: 1,
    width: '120%',
    backgroundColor: theme.colors.tint,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: getStatusBarHeight(),
  },
  grid: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    maxWidth: '95%',
    paddingBottom: 100,
    // overflow: 'hidden',
  },
})
