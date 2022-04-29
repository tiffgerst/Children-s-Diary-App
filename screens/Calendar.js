import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import * as SecureStore from 'expo-secure-store'
import moment from 'moment'
import { theme } from '../src/core/theme'
import Background3 from '../components/Background3'
import BackButton from '../components/BackButton'
import SearchBarList from '../components/SearchBarList'

export default function CalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [postData, setPostData] = useState([])


  // get post data from api
  useEffect(() => {
    const getData = async () => {
      const userID = await SecureStore.getItemAsync('userID')
      const apiResponse = await fetch(
        `https://mirradiaryapp.azurewebsites.net/post/all/` + userID
      )
      const data = await apiResponse.json()
      const sorted = data.sort((a, b) => b.postID - a.postID)
      setPostData(sorted)
    }
    getData()
  }, [])

  let markDate = postData.map(function (dateInfo) {
    return moment(dateInfo.createDateTime).format('YYYY-MM-DD')
  })
  let markDateObject = {}
  markDate.forEach((date) => {
    markDateObject[date] = {
      selected: true,
      marked: true,
      selectedColor: '#8FD1CD',
      customStyles: {
        text: {
          color: '#6B7285',
          fontWeight: 'bold',
        },
      },
    }
  })

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
          todayTextColor: '#0B9D94',
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
          textDayFontSize: 15,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 15,
        }}
        onDayPress={(day) => {
          console.log('selected day', day)
          setSelectedDate(day.dateString)
        }}
        markingType={'custom'}
        markedDates={markDateObject}
        enableSwipeMonths={true}
      />
      {selectedDate ? (
        <Text style={styles.entry}>
          Entries {moment(selectedDate).format('DD MMM YYYY')}
        </Text>
      ) : (
        <View></View>
      )}
      <View style={styles.scroll}>
        <SearchBarList
          searchPhrase={moment(selectedDate).format('DD MMM YYYY')}
          data={postData}
          setClicked={false}
          navigation={navigation}
        />
      </View>
    </Background3>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '90%',
    height: '90%',
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
    width: 360,
    height: 410,
    top: 20 + getStatusBarHeight(),
  },
  entry: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    top: 430 + getStatusBarHeight(),
    left: 12,
    color: theme.colors.secondary,
  },
  scroll: {
    flex: 1,
    width: '125%',
    top: getStatusBarHeight(),
  },
  grid: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    maxWidth: '95%',
    paddingBottom: 100,
  },
})
