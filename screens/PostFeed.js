import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import BackButton from '../components/BackButton'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import moment from 'moment'
import TagButtonList from '../components/TagButtonList'

export default function PostFeed({ navigation }) {
  const [postData, setPostData] = useState([])
  const [date, setDate] = useState()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')
  const [imageURL, setImageURL] = useState('')
  
  // get post data from api
  useEffect(() => {
    const getData = async () => {
    const postID = '1'
    const apiResponse = await fetch(
      "http://172.21.8.59:3000/post/" + postID
      );
      const data = await apiResponse.json();
      setPostData(data);
      setDate(moment(postData[0].createDateTime).format('DD MMM YYYY'))
      setTitle(postData[0].titleText)
      setContent(postData[0].contentText)
      setTag(postData[0].tagNameAll)
      setImageURL(postData[0].imageURL)
    };
    getData();
  }, []);

    
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BackButton goBack={navigation.goBack} style={{ position: 'relative' }}/>
        <TouchableOpacity style={styles.edit} onPress={() => console.log('pressed')}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.remove} onPress={() => console.log('pressed')}>
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
          <Text>{JSON.stringify(postData)}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.title}>{title}</Text>
          {tag?(<TagButtonList data={tag}/>):(<View></View>)}
          <Text style={styles.content}>{content}</Text>
          {imageURL?(<Image style={styles.image} source={{url:imageURL}}/>):(<View></View>)}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    width: 46,
    height: 46,
    color: '#5A6174',
    marginVertical: 0,
    paddingVertical: 0,
    marginLeft: 15,
  },
  row: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 80,
  },
  post: {
    height: 36,
    width: 82,
    backgroundColor: '#55B7DE',
    position: 'absolute',
    top: getStatusBarHeight() + 20,
    borderRadius: 6,
    right: 20,
  },
  remove: {},
  edit: {
    color: 'white',
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 8,
    fontWeight: 'bold',
  },
  date: {},
  title: {
    fontSize: 22,
    paddingLeft: 20,
    marginTop: -30,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  tag: {},
  content: {},
  image: {},
})
