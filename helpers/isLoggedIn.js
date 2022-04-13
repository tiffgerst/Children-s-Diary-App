import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import * as add from '../ip/config'

export async function isLoggedIn() {
  const ip = add.ip
  let login = false
  try {
    const credentials = await SecureStore.getItemAsync('token')
    console.log(credentials)
    if (credentials) {
      axios
        //192.168.0.75
        .post(`http://${ip}:3000/appUser/isLoggedIn`, {
          headers: {
            Authorization: credentials,
          },
        })
        .then(() => {
          login = true
        })
        .catch((error) => {
          login = false
          console.log('boo')
        })
    }
  } catch (err) {
    console.log(err)
    console.log('hello')
  }
}
