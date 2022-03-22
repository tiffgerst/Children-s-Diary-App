import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { theme } from '../src/core/theme'
import Background3 from '../components/Background3'
import BackButton from '../components/BackButton'
import JournalFeed from '../components/JournalFeed'
import SearchBar from '../components/SearchBar'
import SearchBarList from '../components/SearchBarList'
import moment from 'moment'

export default function CalendarScreen({ navigation }) {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [postData, setPostData] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [markDate, setMarkDate] = useState([])
  const [markDates, setMarkDates] = useState([])

  // get post data from api
  useEffect(() => {
    const userID = '1'
    const getData = async () => {
      const apiResponse = await fetch(
        "http://172.21.9.18:3000/post/all/" + userID
      );
      const data = await apiResponse.json();
      setPostData(data);
    };
    getData();
    let data = postData.map(function(dateInfo){return moment(dateInfo.createDateTime).format('YYYY-MM-DD')})
    setMarkDate(data);
    // let markDateObject = {};
    // markDate.forEach((date) => {
    //   markDateObject[date] = {
    //       selected: true,
    //       marked: true,
    //       selectedColor: '#8FD1CD'
    //   };
    // });
  }, []);

  // function getMarkDate () {
  //   useEffect(() => {
  //     let data = postData.map(function(dateInfo){return moment(dateInfo.createDateTime).format('YYYY-MM-DD')})
  //     setMarkDates(data);
  //     let markDateObjects = {};
  //     markDate.forEach((date) => {
  //       markDateObjects[date] = {
  //           selected: true,
  //           marked: true,
  //           selectedColor: '#8FD1CD'
  //       };
  //     return markDateObjects
  //     });
  //   }, []);
  // }


  let markDateObject = {};

  markDate.forEach((date) => {
    markDateObject[date] = {
        selected: true,
        marked: true,
        selectedColor: '#8FD1CD'
    };
  });

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
          textDayFontSize: 15,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 15,
        }}
        onDayPress={day => {
          console.log('selected day', day);
          setSelectedDate(day.dateString);
        }}
        // markingType={'custom'}
        markedDates={markDateObject}
      />
           
      {/* <Text>{JSON.stringify(markDate)}</Text> */}

      <Text style={styles.entry}>Entries</Text>
      <View style={styles.scroll}>
        <SearchBarList
          contentContainerStyle={{paddingBottom: 10}}
          searchPhrase={moment(selectedDate).format('DD MMM YYYY')}
          data={postData}
          setClicked={setClicked}
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
    height: 430,
    top: 40 + getStatusBarHeight(),
  },
  entry: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    top: 450 + getStatusBarHeight(),
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
    // overflow: 'hidden',
  },
})
